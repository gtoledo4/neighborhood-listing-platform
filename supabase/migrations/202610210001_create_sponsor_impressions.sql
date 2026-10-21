-- Sponsor impression tracking
-- Records sponsor displays without visitor identity or IP addresses.

CREATE TABLE public.sponsor_impressions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sponsor_id UUID NOT NULL
        REFERENCES public.sponsors(id),

    placement TEXT NOT NULL
        CONSTRAINT chk_impressions_placement
        CHECK (placement IN ('property_card', 'property_detail')),

    property_zip_code TEXT NOT NULL
        CONSTRAINT chk_impressions_zip
        CHECK (property_zip_code ~ '^[0-9]{5}$'),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent direct public access to impression records.
ALTER TABLE public.sponsor_impressions
ENABLE ROW LEVEL SECURITY;

-- Explicit permissions for the server-side service role.
-- No access is granted to anon or authenticated.
REVOKE ALL ON TABLE public.sponsor_impressions
FROM PUBLIC, anon, authenticated;

GRANT INSERT, SELECT
ON TABLE public.sponsor_impressions
TO service_role;