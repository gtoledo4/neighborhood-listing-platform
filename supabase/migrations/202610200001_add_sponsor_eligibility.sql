-- Sponsor eligibility: approval and selection priority

ALTER TABLE public.sponsors
ADD COLUMN is_approved BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN priority INTEGER NOT NULL DEFAULT 0
    CONSTRAINT chk_sponsors_priority_nonnegative CHECK (priority >= 0);

-- Sponsor placement and campaign dates

ALTER TABLE public.sponsors
ADD COLUMN placement TEXT NOT NULL DEFAULT 'property_detail'
    CONSTRAINT chk_sponsors_placement CHECK (
        placement IN ('property_card', 'property_detail')
    ),
ADD COLUMN campaign_start DATE NULL,
ADD COLUMN campaign_end DATE NULL,
ADD CONSTRAINT chk_sponsors_campaign_dates CHECK (
    campaign_start IS NULL
    OR campaign_end IS NULL
    OR campaign_end >= campaign_start
);

-- Sponsor geographic targeting

ALTER TABLE public.sponsors
ADD COLUMN target_zip_code TEXT NULL
    CONSTRAINT chk_sponsors_target_zip_code CHECK (
        target_zip_code IS NULL
        OR target_zip_code ~ '^[0-9]{5}$'
    ),
ADD COLUMN target_radius_miles NUMERIC(6,2) NULL
    CONSTRAINT chk_sponsors_target_radius CHECK (
        target_radius_miles IS NULL
        OR target_radius_miles >= 0
    ),
ADD CONSTRAINT chk_sponsors_radius_requires_zip CHECK (
    target_radius_miles IS NULL
    OR target_zip_code IS NOT NULL
);