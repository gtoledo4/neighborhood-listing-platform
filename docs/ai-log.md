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


## Practical Exam — AI Provenance Journal
**Date:** October 29, 2026
**Branch:** `exam/practical-persistence-eval`
| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Part 1 - ChatGPT / Git | Asked for guidance on creating a clean examination branch. | Used Git commands to commit existing work and create the examination branch. | None rejected. | Verified branch name and clean working tree using Git. | 9fea3ba (pre-exam commit); exam commit pending |
| Part 1 - ChatGPT / Security | Asked for help verifying .gitignore and sensitive file protection. | Used commands to check ignored files and repository status. | None rejected. | Confirmed required paths were ignored using git check-ignore and git status. | Pending |