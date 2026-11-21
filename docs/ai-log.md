Gemini gave me a very simple and easy explanation of what the stack- Next.js, TypeScript, and Tailwind CSS does, how they work together, and why it is more efficient for a developer. Gemini claims TypeScript catches any logical errors before you run or publish the app, Next.js handles routing users from page to page and delivering the site efficiently, while Tailwind controls the layout, meaning what color you want the site to be and how big the font will also be.
ChatGPT's explanation was a little more complex, claiming Next.js is a framework built around React, which is hard to understand. TypeScript makes sure the code is using the correct type of information, and finally, Tailwind gives you small utility classes that help control things like borders and spacing. This eplanation like i said, reads as more complex with no simple explanation, which make it dificult to understan if you dont have any expariance.
Created the App Shell Architect prompt requesting Next.js, TypeScript, Tailwind, accessible HTML, no secrets, commands, and a file plan. Used the setup guidance and file plan to create the app shell Rejected a giant code dump and anything involving secrets. Verified the project by running the Next.js development server and checking the browser.

## Normalization review

I asked ChatGPT EDU and Gemini to identify normalization concerns with the property data model, especially the amenities field. Both identified inconsistent amenity names and difficulty searching or filtering free-text amenities as normalization concerns. Both also identified a many-to-many Amenities/PropertyAmenities design as the most normalized approach for a relational production database.
Decision:
For my current project, amenities will remain an array of controlled string values. This keeps the JSON contract simple while preventing inconsistent free-text values. Free text may still be appropriate for optional descriptive details, but not for the standardized amenity values.

## ChatGPT and Gemini stakeholder discovery questions
No real stakeholder interviews.

### ChatGPT
ChatGPT set up simple, straightforward questions to ask stakeholders and local business sponsors about how they work, what their customers need, how they handle content approvals, and what success looks like for them. The goal is to keep these questions completely neutral and privacy-friendly so we can get honest, helpful feedback without making assumptions or asking for sensitive info.

### Gemini
We checked eight discovery questions to make sure they weren't leading, pushy, or invading anyone's privacy. We fixed a few questions so they don't assume a business already has formal review steps, added questions about accessibility, and made sure everything stays neutral. Since we haven't talked to real people yet, these questions are just our starting point.



## AI Collaboration: Simulated Interview Analysis
Google AI Studio
The input contained fictional profiles and invented responses for Maria Torres, a property professional, and Daniel Brooks, a local sponsor. No real interviews were conducted.

- Identified data accuracy and consistency as recurring simulated themes.
- Suggested structured property and business information fields.
- Identified content review and correction as potential requirements.
- Highlighted accessibility, usability, and success measurement as areas to investigate.
- Identified uncertainties about integrations, approval responsibilities, and analytics.

### Corrections and rejected interpretations
- Corrected the unsupported claim that Maria specifically requested mobile data entry.
- Did not treat a formal pre-publication approval workflow as a confirmed requirement.
- Deferred engagement analytics pending confirmation of project scope and technical feasibility.
- Did not add external integrations or complex approval hierarchies as established requirements.

### Verification
Compared the generated analysis against the source notes.

## Database Design
Google AI Studio, with ChatGPT used to review the proposed design.
- Documented an entity-relationship diagram
- Identified five entities
- Generated and reviewed proposed PostgreSQL DDL for the five tables
- Added proposed primary keys, foreign keys, uniqueness rules, validation constraints, timestamp defaults and triggers, and query indexes
- Enabled row-level security in the proposed SQL without adding permissive policies
AI generated the initial diagram and SQL proposal. The design was reviewed step by step.

### Database Migration and Verification
- Migration file: supabase/migrations/202610140001_create_neighborhood_schema.sql
- Prepared and reviewed the PostgreSQL migration for the five database tables, foreign keys, constraints, timestamp-update triggers, indexes, and row-level security.
- Applied the migration to the Supabase database.
- Enabled row-level security and configured policies for property access.
- Tested authenticated property creation; a valid property was created successfully with draft status.
- Confirmed unauthenticated property creation is rejected.
- Tested invalid property data, including negative prices, invalid state codes, malformed ZIP codes, fractional bedroom counts, and invalid amenities; each request was rejected with an appropriate validation error.
- Fixed a database permission issue by granting the authenticated role table-level INSERT permission while retaining row-level security.
- Verified that TypeScript checks and the production build pass. ESLint completes with one existing image-optimization warning in src/components/PropertyCard.tsx.
- Test records used during verification are synthetic development data.

## Lab 7 — Asset Optimization and Sponsor Content Review
### Image Assets
- Created three AI-generated fictional property illustrations for the class demonstration.
- Converted the original PNG images into optimized WebP files.
- Used Next.js Image with explicit dimensions and responsive sizes.
- Added descriptive alt text and a visible disclaimer identifying the images as AI-generated illustrations.
- Recorded asset information and approval in docs/lab7-asset-inventory.md.

### Sponsor Content — AI Collaboration
- Created a facts-only brief for the fictional sponsor, Sunshine Mortgage.
- Used Google AI Studio to generate three promotional message options.
- Used ChatGPT to review the messages for unsupported claims, discriminatory wording, guarantees, and artificial urgency.
- Selected and approved the following message on November 19, 2026:
  "Explore financing options for your next home with Sunshine Mortgage."

- Stored the original AI-generated drafts separately from the approved application content.
- Added the disclosure: "Fictional sponsor — demonstration content only."
- Prevented the fictional sponsor's placeholder website URL from appearing as a clickable link.

### Sponsor Content — Validation Tests
Manually tested the sponsor content safeguards in the browser.
1. Draft status: Changed approval status from approved to draft. The sponsor disappeared and the neighborhood information banner appeared. PASS.
2. Expired content: Set an expiration date in the past. The sponsor disappeared and the fallback banner appeared. PASS.
3. Message length: Entered a promotional message exceeding 120 characters. The sponsor disappeared and the fallback banner appeared. PASS.
Restored the approved message, approval status, and original expiration setting after testing.

### Verification and Limitations
- npx tsc --noEmit completed without errors.
- Confirmed that the approved sponsor message and fictional-content disclosure display correctly in the browser.
- All sponsor information is fictional demonstration content, not a verified real-world advertisement.
- Gemini's independent fidelity review and final image-performance measurements are still pending.

### Lab 7 — Gemini Sponsor Content Fidelity Review

- Tool: Google AI Studio (Gemini)
- Purpose: Independently verify that three AI-generated promotional messages match the approved facts-only brief for the fictional sponsor Sunshine Mortgage.

Results:
- Message 1: Faithful to the approved facts. No corrections required.
- Message 2: Faithful to the approved facts. No corrections required.
- Message 3: Faithful to the approved facts. No corrections required.
- Gemini identified no invented claims, guarantees, urgency, discriminatory wording, or misleading financial promises.
- Gemini recommended clearly identifying the sponsor as fictional in the application interface.

Decision:
- Reviewed Gemini's findings against the sponsor brief.
- Confirmed that the application already displays the fictional sponsor disclosure.
- Retained Message 1 as the only approved promotional message.
- Messages 2 and 3 remain unapproved alternatives.

Conclusion: Both ChatGPT and Gemini completed their assigned reviews. No changes to the approved promotional message were necessary.

### Lab 7 — Performance Verification
Date: November 20, 2026

- Successfully completed the Next.js production build.
- Tested the production application at http://localhost:3001 using Chrome Lighthouse.
- Production Lighthouse Performance score: 100/100.
- Largest Contentful Paint (LCP): 0.5 seconds.
- First Contentful Paint (FCP): 0.2 seconds.
- Total Blocking Time (TBT): 0 milliseconds.
- Cumulative Layout Shift (CLS): 0.
- Total network payload: approximately 251 KiB.
- Earlier development-server Lighthouse results: Performance 97/100, LCP 0.8 seconds, network payload approximately 916 KiB.
- Converted three original PNG illustrations to optimized WebP files, reducing their combined file size by approximately 92.3%.
- Lighthouse identified approximately 42 KiB of potential additional image-delivery savings.

Limitations:
- Development and production measurements are not directly equivalent.
- The Lighthouse results are local, simulated measurements rather than real-user performance data.
- No equivalent pre-optimization Lighthouse baseline was captured, so an exact before-and-after LCP improvement attributable to image optimization cannot be established.