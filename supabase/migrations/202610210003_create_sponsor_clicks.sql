CREATE TABLE public.sponsor_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sponsor_id UUID NOT NULL
        REFERENCES public.sponsors(id),

    placement TEXT NOT NULL
        CONSTRAINT chk_clicks_placement
        CHECK (placement IN ('property_card', 'property_detail')),

    property_zip_code TEXT NOT NULL
        CONSTRAINT chk_clicks_zip
        CHECK (property_zip_code ~ '^[0-9]{5}$'),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security.
ALTER TABLE public.sponsor_clicks ENABLE ROW LEVEL SECURITY;

-- Prevent direct access from browser-facing roles.
REVOKE ALL ON TABLE public.sponsor_clicks
FROM PUBLIC, anon, authenticated;

-- Allow server-side access through the service role.
GRANT INSERT, SELECT ON TABLE public.sponsor_clicks
TO service_role;