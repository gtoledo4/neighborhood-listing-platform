# Security Audit — Practical Exam

## Security controls implemented in migration

- Row Level Security policies drafted for database access.
- Property ownership checked against authenticated users.
- Property creation restricted to authenticated owners.
- Property updates restricted by ownership and permitted status.
- Administrative authorization based on the user's profile role.
- Public property access restricted to approved listings.
- Inquiry access controlled through database policies.
- Server API validates access tokens using Supabase Auth.
- Property input validated using Zod.
- API assigns owner_id from the verified user, not request input.
- API creates new properties with draft status.

## Verification performed

- TypeScript check: passed.
- Next.js production build: passed.
- Git commits: confirmed.

## Outstanding verification

The database migration and RLS policies have not been applied
or tested against the remote Supabase database.

The existing database uses active property status, while the
draft migration and new API use approved status.

No live RLS enforcement or API integration test is claimed.

## Deployment decision

Do not deploy the migration until migration history is reconciled,
a database backup is available, and RLS policies can be tested
with anonymous, owner, non-owner, and administrator accounts.

## Practical Exam — Deployed Verification (2026-10-30 PDT)

Environment: Vercel preview, exam/practical-persistence-eval
Database: Supabase remote project

| Test | Expected | Observed | Result |
|---|---|---|---|
| Public GET /api/properties | Approved property data with six allowed fields | Three records returned; each contained id, address, price, bedrooms, bathrooms, square_feet | PASS |
| Anonymous POST /api/properties | HTTP 401 | HTTP 401, Authentication required | PASS |
| POST with invalid Bearer token | HTTP 401 | HTTP 401, Invalid authentication token | PASS |
| RLS enabled on five required tables | Enabled | Enabled on profiles, sponsors, properties, property_sponsors, inquiries | PASS |
| Draft/rejected visibility | Not publicly accessible | Not tested | PENDING |
| Valid authenticated POST | HTTP 201 for valid owner submission | Not tested | PENDING |
| Owner/admin authorization | Access restricted by role and ownership | Not tested | PENDING |

Note: Passing API tests does not independently establish that all
database RLS policies behave correctly. Remaining tests are pending.
