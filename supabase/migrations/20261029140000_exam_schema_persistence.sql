-- Practical Exam: Schema and Persistence Migration
-- Migration: 20261029140000_exam_schema_persistence
--
-- Purpose:
-- Adapt the existing Supabase schema to the practical exam requirements.
--
-- IMPORTANT:
-- This migration has not been applied or tested against the remote database.
-- Existing records, relationships, and sponsor-selection functionality
-- must be preserved.

BEGIN;

-- 1. PROFILES
-- Preserve profile IDs and existing property ownership.

-- Remove the legacy role constraint before converting values.
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS chk_profiles_role;

-- Convert legacy user accounts to property owners.
-- This mapping is specific to the existing exam database.
UPDATE public.profiles
SET role = 'property_owner'
WHERE role = 'user';

-- Restrict roles to the four values required by the exam.
ALTER TABLE public.profiles
ADD CONSTRAINT chk_profiles_role
CHECK (
    role IN (
        'admin',
        'property_owner',
        'sponsor',
        'public'
    )
);

-- Set the default role for newly created profiles.
ALTER TABLE public.profiles
ALTER COLUMN role SET DEFAULT 'public';

-- 2. SPONSORS
-- Add exam-required fields while preserving legacy sponsor columns.

ALTER TABLE public.sponsors
ADD COLUMN name TEXT,
ADD COLUMN tier TEXT NOT NULL DEFAULT 'bronze',
ADD COLUMN active_status BOOLEAN NOT NULL DEFAULT TRUE;

-- Preserve existing sponsor names and activity values.
UPDATE public.sponsors
SET
    name = business_name,
    active_status = is_active;

-- Require a valid sponsor name.
ALTER TABLE public.sponsors
ALTER COLUMN name SET NOT NULL;

ALTER TABLE public.sponsors
ADD CONSTRAINT chk_sponsors_name_length
CHECK (char_length(btrim(name)) >= 2);

-- Restrict sponsorship tiers.
ALTER TABLE public.sponsors
ADD CONSTRAINT chk_sponsors_tier
CHECK (tier IN ('gold', 'silver', 'bronze'));

-- 3. PROPERTIES
-- Preserve existing property IDs and ownership relationships.

-- Remove the legacy status constraint.
ALTER TABLE public.properties
DROP CONSTRAINT IF EXISTS chk_properties_status;

-- Convert existing statuses to the exam's allowed values.
UPDATE public.properties
SET status = CASE status
    WHEN 'pending_approval' THEN 'pending'
    WHEN 'active' THEN 'approved'
    WHEN 'inactive' THEN 'draft'
    WHEN 'archived' THEN 'rejected'
    ELSE status
END;

-- Restrict property statuses to exam values.
ALTER TABLE public.properties
ADD CONSTRAINT chk_properties_status
CHECK (status IN ('draft', 'pending', 'approved', 'rejected'));

-- Ensure new properties start as drafts.
ALTER TABLE public.properties
ALTER COLUMN status SET DEFAULT 'draft';

-- Replace the existing square footage constraint.
ALTER TABLE public.properties
DROP CONSTRAINT IF EXISTS chk_properties_square_feet;

ALTER TABLE public.properties
ADD CONSTRAINT chk_properties_square_feet
CHECK (square_feet > 0);

-- 4. PROPERTY_SPONSORS
-- Preserve existing assignments and the composite primary key.
-- Update sponsor deletion behavior to match exam requirements.

ALTER TABLE public.property_sponsors
DROP CONSTRAINT IF EXISTS property_sponsors_sponsor_id_fkey;

ALTER TABLE public.property_sponsors
ADD CONSTRAINT property_sponsors_sponsor_id_fkey
FOREIGN KEY (sponsor_id)
REFERENCES public.sponsors(id)
ON DELETE CASCADE;

-- 5. INQUIRIES
-- Require a valid email and a message of at least 10 characters.
-- Preserve existing inquiry IDs and profile relationships.

ALTER TABLE public.inquiries
ADD COLUMN inquirer_email TEXT NOT NULL;

ALTER TABLE public.inquiries
ADD CONSTRAINT chk_inquiries_email
CHECK (
    inquirer_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
);

-- Replace the existing message constraint.
ALTER TABLE public.inquiries
DROP CONSTRAINT IF EXISTS chk_inquiries_message_nonempty;

ALTER TABLE public.inquiries
ADD CONSTRAINT chk_inquiries_message_length
CHECK (char_length(btrim(message)) >= 10);

-- Change property deletion behavior to cascade.
ALTER TABLE public.inquiries
DROP CONSTRAINT IF EXISTS inquiries_property_id_fkey;

ALTER TABLE public.inquiries
ADD CONSTRAINT inquiries_property_id_fkey
FOREIGN KEY (property_id)
REFERENCES public.properties(id)
ON DELETE CASCADE;

-- 6. COMPATIBILITY
-- Update dependent sponsor-selection logic and existing policies.

CREATE OR REPLACE FUNCTION public.get_eligible_sponsors(
    p_property_id UUID,
    p_placement TEXT,
    p_as_of DATE
)
RETURNS TABLE (
    id UUID,
    business_name TEXT,
    category TEXT,
    website_url TEXT,
    priority INTEGER
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
    SELECT
        s.id,
        s.business_name,
        s.category,
        s.website_url,
        s.priority
    FROM public.sponsors AS s
    INNER JOIN public.property_sponsors AS ps
        ON ps.sponsor_id = s.id
    INNER JOIN public.properties AS p
        ON p.id = ps.property_id
    WHERE p.id = p_property_id
        AND p.status = 'approved'
        AND s.is_approved = TRUE
        AND s.is_active = TRUE
        AND s.placement = p_placement
        AND (
            s.campaign_start IS NULL
            OR s.campaign_start <= p_as_of
        )
        AND (
            s.campaign_end IS NULL
            OR s.campaign_end >= p_as_of
        )
        AND (
            s.target_zip_code IS NULL
            OR s.target_zip_code = p.zip_code
            OR (
                s.target_radius_miles IS NOT NULL
                AND EXISTS (
                    SELECT 1
                    FROM public.zip_locations AS sponsor_zip
                    JOIN public.zip_locations AS property_zip
                        ON property_zip.zip_code = p.zip_code
                    WHERE sponsor_zip.zip_code = s.target_zip_code
                        AND (
                            3958.8 * 2 * ASIN(
                                SQRT(
                                    POWER(
                                        SIN(
                                            RADIANS(
                                                property_zip.latitude
                                                - sponsor_zip.latitude
                                            ) / 2
                                        ),
                                        2
                                    )
                                    + COS(RADIANS(sponsor_zip.latitude))
                                    * COS(RADIANS(property_zip.latitude))
                                    * POWER(
                                        SIN(
                                            RADIANS(
                                                property_zip.longitude
                                                - sponsor_zip.longitude
                                            ) / 2
                                        ),
                                        2
                                    )
                                )
                            )
                        ) <= s.target_radius_miles
                )
            )
        )
    ORDER BY s.priority DESC, s.id ASC;
$$;

-- Restrict function execution to the server-side service role.
REVOKE ALL ON FUNCTION public.get_eligible_sponsors(
    UUID, TEXT, DATE
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.get_eligible_sponsors(
    UUID, TEXT, DATE
) TO service_role;

-- 7. PROPERTY RLS POLICIES
-- Replace policies that reference legacy property statuses.

DROP POLICY IF EXISTS "Public can read active properties"
ON public.properties;

DROP POLICY IF EXISTS "Owners can read their own unapproved properties"
ON public.properties;

DROP POLICY IF EXISTS "Owners can update their own unapproved properties"
ON public.properties;

CREATE POLICY "Public can read approved properties"
ON public.properties
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Owners can read their own properties"
ON public.properties
FOR SELECT
TO authenticated
USING (owner_id = (SELECT auth.uid()));

CREATE POLICY "Owners can update their own draft or rejected properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'rejected')
)
WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'rejected')
);

-- Allow property owners to delete only their own listings.
GRANT DELETE ON public.properties TO authenticated;

CREATE POLICY "Owners can delete their own properties"
ON public.properties
FOR DELETE
TO authenticated
USING (
    owner_id = (SELECT auth.uid())
);

-- 8. SPONSOR AND PROPERTY-SPONSOR RLS POLICIES

-- Public users can read active sponsors.
DROP POLICY IF EXISTS "Public can read active sponsors"
ON public.sponsors;

CREATE POLICY "Public can read active sponsors"
ON public.sponsors
FOR SELECT
TO anon, authenticated
USING (
    is_active = TRUE
    AND active_status = TRUE
);

-- Public users can read associations for approved properties.
DROP POLICY IF EXISTS "Public can read associations for active properties"
ON public.property_sponsors;

CREATE POLICY "Public can read associations for approved properties"
ON public.property_sponsors
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.properties AS p
        WHERE p.id = property_sponsors.property_id
          AND p.status = 'approved'
    )
);
-- 9. INQUIRY PERMISSIONS AND RLS

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Remove public read access.
REVOKE SELECT ON public.inquiries FROM anon, authenticated;

-- Permit anonymous and signed-in users to submit inquiries.
GRANT INSERT ON public.inquiries TO anon, authenticated;

-- Anonymous users may submit inquiries, but cannot read them.
DROP POLICY IF EXISTS "Public can submit inquiries"
ON public.inquiries;

CREATE POLICY "Public can submit inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
    profile_id IS NULL
    OR profile_id = (SELECT auth.uid())
);

-- Allow signed-in users to read inquiries for properties they own.
GRANT SELECT ON public.inquiries TO authenticated;

CREATE POLICY "Owners can read inquiries for their properties"
ON public.inquiries
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.properties AS p
        WHERE p.id = inquiries.property_id
          AND p.owner_id = (SELECT auth.uid())
    )
);
-- 10. SECURE ADMINISTRATOR ROLE CHECK

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = (SELECT auth.uid())
          AND role = 'admin'
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
-- 11. ADMINISTRATOR PROPERTY POLICIES

CREATE POLICY "Admins can read all properties"
ON public.properties
FOR SELECT
TO authenticated
USING ((SELECT public.is_admin()));

CREATE POLICY "Admins can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY "Admins can update all properties"
ON public.properties
FOR UPDATE
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));
-- Allow administrators to delete any property.
CREATE POLICY "Admins can delete all properties"
ON public.properties
FOR DELETE
TO authenticated
USING ((SELECT public.is_admin()));
-- 12. ADMINISTRATOR INQUIRY ACCESS

CREATE POLICY "Admins can read all inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING ((SELECT public.is_admin()));
-- 13. ADMINISTRATOR SPONSOR ACCESS

-- PostgreSQL grants apply to all authenticated users.
-- RLS restricts write operations to verified administrators.
GRANT INSERT, UPDATE, DELETE
ON public.sponsors
TO authenticated;

CREATE POLICY "Admins can read all sponsors"
ON public.sponsors
FOR SELECT
TO authenticated
USING ((SELECT public.is_admin()));

CREATE POLICY "Admins can insert sponsors"
ON public.sponsors
FOR INSERT
TO authenticated
WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY "Admins can update sponsors"
ON public.sponsors
FOR UPDATE
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY "Admins can delete sponsors"
ON public.sponsors
FOR DELETE
TO authenticated
USING ((SELECT public.is_admin()));
-- 14. ADMINISTRATOR PROPERTY-SPONSOR ACCESS

GRANT INSERT, UPDATE, DELETE
ON public.property_sponsors
TO authenticated;

CREATE POLICY "Admins can read all property sponsors"
ON public.property_sponsors
FOR SELECT
TO authenticated
USING ((SELECT public.is_admin()));

CREATE POLICY "Admins can insert property sponsors"
ON public.property_sponsors
FOR INSERT
TO authenticated
WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY "Admins can update property sponsors"
ON public.property_sponsors
FOR UPDATE
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY "Admins can delete property sponsors"
ON public.property_sponsors
FOR DELETE
TO authenticated
USING ((SELECT public.is_admin()));
-- 15. SPONSOR ACTIVITY SYNCHRONIZATION
-- Keep the legacy is_active column consistent with active_status.

CREATE OR REPLACE FUNCTION public.sync_sponsor_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.is_active := NEW.active_status;

    ELSIF NEW.active_status IS DISTINCT FROM OLD.active_status THEN
        -- The exam-required field takes precedence.
        NEW.is_active := NEW.active_status;

    ELSIF NEW.is_active IS DISTINCT FROM OLD.is_active THEN
        -- Preserve compatibility with legacy updates.
        NEW.active_status := NEW.is_active;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sync_sponsor_activity
BEFORE INSERT OR UPDATE
ON public.sponsors
FOR EACH ROW
EXECUTE FUNCTION public.sync_sponsor_activity();
COMMIT;