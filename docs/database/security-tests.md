# Step 13 — Database Security Tests

## Purpose

Verify that unauthorized users cannot read, insert, update, or delete protected property records.

Tests were performed using the Supabase SQL Editor with simulated `anon` and `authenticated` roles.

## Security Test Results

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Anonymous user reads a draft property | 0 rows | 0 rows | PASS |
| Different authenticated user updates another owner's property | 0 updated rows | 0 updated rows | PASS |
| Authenticated user inserts a property assigned to another owner | Access denied | RLS violation, error 42501 | PASS |
| Anonymous user deletes a property | Access denied | Table permission denied, error 42501 | PASS |
| Protected property remains unchanged | Original values preserved | Price $450,000; status `draft` | PASS |
| Anonymous user inserts a property | Access denied | Table permission denied, error 42501 | PASS |
| Denied anonymous insertion creates no record | 0 records | 0 records | PASS |

## Test Records

- Existing protected property: `PROP-API-TEST-001`
- Attempted anonymous insertion: `PROP-ANON-DENIED-001`
- Simulated unauthorized user: `11111111-1111-4111-8111-111111111111`

## Findings

The tested database permissions successfully prevented unauthorized access and modifications.

Anonymous INSERT and DELETE attempts were blocked by PostgreSQL table permissions before Row Level Security (RLS) evaluation.

The authenticated user's unauthorized INSERT was rejected by an RLS policy. The unauthorized UPDATE affected zero rows.

The existing protected property retained its original values, and the denied anonymous INSERT created no record.

## Conclusion

All seven security checks passed. No RLS policies or database schema changes were required.

These results demonstrate the tested restrictions; they do not constitute an exhaustive security audit.