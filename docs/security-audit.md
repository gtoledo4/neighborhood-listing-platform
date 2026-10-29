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
