-- ZIP code coordinates for sponsor radius matching

CREATE TABLE public.zip_locations (
    zip_code TEXT PRIMARY KEY
        CONSTRAINT chk_zip_locations_zip_code
        CHECK (zip_code ~ '^[0-9]{5}$'),

    latitude DOUBLE PRECISION NOT NULL
        CONSTRAINT chk_zip_locations_latitude
        CHECK (latitude BETWEEN -90 AND 90),

    longitude DOUBLE PRECISION NOT NULL
        CONSTRAINT chk_zip_locations_longitude
        CHECK (longitude BETWEEN -180 AND 180)
);

-- Default deny: enable row-level security.
ALTER TABLE public.zip_locations ENABLE ROW LEVEL SECURITY;