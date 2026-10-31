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



### Practical Exam — Final AI Attribution and Verification
Date: October 30, 2026
Branch: exam/practical-persistence-eval

## Part 1 — Git and Security Setup
- AI assistance: ChatGPT provided Git commands, branch setup guidance, and suggestions for checking ignored files and repository security.
- Independent verification: I checked the code repository to make sure everything is on the correct exam branch, fully updated on GitHub, and added pdt605 as a collaborator. I then ran Secretlint over all current files and past commit histories to ensure no secret API keys or passwords were saved accidentally. Neither scan found any secrets.

## art 2 — Requirements
- AI assistance: ChatGPT helped organize the three user stories, Given/When/Then acceptance criteria, estimates, and implementation traceability.
- Independent verification: I reviewed docs/requirements.md, confirmed that it included the property owner, public inquirer, and platform administrator requirements, and committed the document.

## Parts 3 and 4 — Database Schema and Row-Level Security
- AI assistance: ChatGPT helped draft and troubleshoot SQL migrations, database constraints, authorization functions, and row-level security policies. AI also suggested procedures for investigating inconsistent Supabase migration history.
- Independent verification: I reviewed the database changes, fixed the record of past updates, and pushed the new migration to Supabase. The update finished successfully, and I verified that security rules are turned on for all five main tables: profiles, sponsors, properties, property_sponsors, and inquiries.

## Part 5 — Zod Validation and API
- AI assistance: ChatGPT proposed the property validation schema, Supabase server wrapper, and authenticated GET/POST API implementation. AI also helped troubleshoot the Vercel preview configuration.
- Independent verification: I ran npx tsc --noEmit, npm run build, and lint checks during implementation. After correcting the Vercel Preview environment configuration, I tested the deployed API:
GET /api/properties returned three approved property records with the six expected fields: id, address, price, bedrooms, bathrooms, and square_feet.
An anonymous POST request returned HTTP 401 with an authentication-required response.
A POST request using an invalid Bearer token returned HTTP 401 with an invalid-token response.

## Part 6 — Accessibility and Responsive UI
- AI assistance: ChatGPT suggested accessible article labeling, semantic HTML improvements, responsive grid layout, and keyboard focus styling.
- Independent verification: I inspected the component source, ran TypeScript checks, and completed a production build.

## Security Audit and Deployment Verification

- AI assistance: ChatGPT helped draft docs/security-audit.md, organize the test matrix, troubleshoot deployment issues, and document verification results.
- Independent verification: I saved and uploaded the updated security document, ran the database update on Supabase, and made sure data security RLS was turned on. I then tested the live API and noted down the results. The security report now clearly separates tests that are actually finished from tests that are still waiting to be run, instead of marking everything as complete upfront.


## Credential and Git History Verification

- AI assistance: ChatGPT suggested Git history inspection commands and Secretlint scanning procedures.
- Independent verification: I ran Secretlint using its standard security rules to scan both our current project files and the entire Git history. The tool found no passwords, API keys, or secret tokens.