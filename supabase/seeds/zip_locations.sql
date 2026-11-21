-- ZIP location seed data for sponsor-selection testing
-- Source: ZIP-Codes.com, ZIP 95825
-- Coordinates represent approximate ZIP-area locations.

INSERT INTO public.zip_locations (
    zip_code,
    latitude,
    longitude
)
VALUES (
    '95825',
    38.5898,
    -121.4064
)
ON CONFLICT (zip_code) DO UPDATE
SET
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

-- Nearby Sacramento ZIP code for radius testing
-- Source: ZIP-Codes.com, ZIP 95826

INSERT INTO public.zip_locations (
    zip_code,
    latitude,
    longitude
)
VALUES (
    '95826',
    38.5491,
    -121.3831
)
ON CONFLICT (zip_code) DO UPDATE
SET
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;