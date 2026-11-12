# Lab 7 — Image Asset Inventory
## Purpose

This inventory identifies the project's image assets, their sources, ownership, licensing status, accessibility purpose, expiration information, and approval requirements. Images with unverified usage rights are not considered approved for publication or redistribution.

## 1. External Property Images

| Asset | Source | Owner / License | Alt-Text Purpose | Expiration | Approval Status |
- 1221 Minorca Drive photo | Redfin CDN, JPG | Unverified | Describe property exterior | Unknown | Pending review |
- 1492 Paseo De Oro photo | Realtor-related CDN, WebP | Unverified | Describe property exterior | Unknown | Pending review |
- 1550 Amalfi Drive photo | Realtor-related CDN, WebP | Unverified | Describe exterior and grounds | Unknown | Pending review |

Source file: src/data/properties.ts

These photos are hosted on external real estate websites. Their public availability does not establish permission to reuse, modify, or redistribute them.

Decision: Do not download or create modified variants until permission is established. Replace them with appropriately licensed or clearly labeled synthetic images if necessary.

## 2. Local Property Placeholder

| Field | Value |

| File | public/property-placeholder.svg |
| Source | Project repository |
| Commit | 9b8629a |
| Commit author | Lupe Toledo |
| Commit date | October 17, 2026 |
| Original creator | Not confirmed |
| License | Not confirmed |
| Dimensions | 640 × 400 |
| Aspect ratio | 8:5 |
| Purpose | Display when a property image is unavailable |
| Alt-text purpose | Communicate that the property photograph is unavailable |
| Expiration | Not established |
| Approval status | Pending provenance verification |

The SVG contains a simple house illustration and the message "Property image unavailable." The Git commit identifies when the asset entered the repository but does not independently establish copyright ownership.

## 3. Framework and Starter Assets

| File | Source / Owner | License | Intended Purpose | Expiration | Status |

| file.svg | To verify | To verify | Starter icon | Not established | Review needed |
| globe.svg | To verify | To verify | Starter icon | Not established | Review needed |
| next.svg | To verify | To verify | Framework branding | Not established | Review needed |
| vercel.svg | To verify | To verify | Platform branding | Not established | Review needed |
| window.svg | To verify | To verify | Starter icon | Not established | Review needed |

These assets are present in public/. Their current usage and applicable license or branding requirements still need verification.

## 4. Accessibility and Performance Findings

The PropertyCard.tsx component currently uses an HTML `<img>` element.

Existing functionality:
- Property records include descriptive alt-text strings.
- Images use responsive width styling.
- A local fallback image is available.

Improvements needed:
- Verify that alt text accurately describes each image.
- Use explicit image dimensions.
- Implement Next.js Image where appropriate.
- Configure responsive image sizes.
- Use approved, optimized image formats.
- Test missing-image behavior and slow connections.
- Compare page weight and Largest Contentful Paint (LCP) before and after optimization.

## 5. Asset Approval Rules

1. Verify ownership and usage permission before publishing images.
2. Record license conditions and attribution requirements.
3. Use meaningful alt text for informative images.
4. Use empty alt text for purely decorative images.
5. Record expiration dates when applicable.
6. Keep original image files outside the public application bundle when generating optimized variants.
7. Do not publish rejected, expired, or unapproved promotional assets.
8. Document corrections, replacements, and removals.

## 6. Next Actions

- Confirm the placeholder's original creator and permission status.
- Review starter assets for usage and licensing.
- Replace or obtain permission for external property photos.
- Create approved, consistently sized image variants.
- Update image components and validate performance.
- Document the content approval and unpublishing process.