-- Ensure public client roles can read the intended public data.
GRANT SELECT ON public.properties TO anon, authenticated;
GRANT SELECT ON public.sponsors TO anon, authenticated;
GRANT SELECT ON public.property_sponsors TO anon, authenticated;

-- Remove broad client write privileges from properties.
REVOKE INSERT, UPDATE, DELETE
ON TABLE public.properties
FROM anon, authenticated;

-- RLS does not protect against TRUNCATE.
-- Remove other unnecessary table privileges from client roles.
REVOKE TRUNCATE, REFERENCES, TRIGGER
ON TABLE public.profiles,
          public.properties,
          public.sponsors,
          public.property_sponsors,
          public.inquiries
FROM anon, authenticated;


-- Owners may insert only these fields. The database supplies
-- the ID, status (default: draft), and timestamps.
GRANT INSERT (
    owner_id,
    property_id,
    address,
    city,
    state,
    zip_code,
    price,
    bedrooms,
    bathrooms,
    square_feet,
    amenities
)
ON public.properties TO authenticated;

-- Owners cannot change owner_id, property_id, status, ID,
-- or timestamps through the ordinary client role.
GRANT UPDATE (
    address,
    city,
    state,
    zip_code,
    price,
    bedrooms,
    bathrooms,
    square_feet,
    amenities
)
ON public.properties TO authenticated;

-- Do not allow ordinary clients to write to these tables.
REVOKE INSERT, UPDATE, DELETE
ON TABLE public.profiles,
          public.sponsors,
          public.property_sponsors,
          public.inquiries
FROM anon, authenticated;

-- PROPERTIES

CREATE POLICY "Public can read active properties"
ON public.properties
FOR SELECT
TO anon, authenticated
USING (status = 'active');

CREATE POLICY "Owners can read their own unapproved properties"
ON public.properties
FOR SELECT
TO authenticated
USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending_approval')
);

CREATE POLICY "Owners can insert their own draft properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status = 'draft'
);

CREATE POLICY "Owners can update their own unapproved properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending_approval')
)
WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending_approval')
);

-- SPONSORS

CREATE POLICY "Public can read active sponsors"
ON public.sponsors
FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);

-- PROPERTY-SPONSOR ASSOCIATIONS

CREATE POLICY "Public can read associations for active properties"
ON public.property_sponsors
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.properties AS p
        WHERE p.id = property_sponsors.property_id
          AND p.status = 'active'
    )
);