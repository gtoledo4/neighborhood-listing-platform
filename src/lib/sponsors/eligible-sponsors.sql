-- Eligible sponsors for a property and placement
-- $1 = property UUID
-- $2 = requested placement
-- $3 = evaluation date

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
WHERE p.id = $1::uuid
    AND p.status = 'active'
    AND s.is_approved = TRUE
    AND s.is_active = TRUE
    AND s.placement = $2::text
    AND (s.campaign_start IS NULL OR s.campaign_start <= $3::date)
    AND (s.campaign_end IS NULL OR s.campaign_end >= $3::date)
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
                                    SIN(RADIANS(property_zip.latitude - sponsor_zip.latitude) / 2),
                                    2
                                )
                                + COS(RADIANS(sponsor_zip.latitude))
                                * COS(RADIANS(property_zip.latitude))
                                * POWER(
                                    SIN(RADIANS(property_zip.longitude - sponsor_zip.longitude) / 2),
                                    2
                                )
                            )
                        )
                    ) <= s.target_radius_miles
            )
        )
    )
ORDER BY s.priority DESC, s.id ASC;