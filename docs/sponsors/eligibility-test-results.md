# Sponsor Eligibility Test Results
## Test Environment
- Database: Development Supabase
- Test property: `PROP-TEST-001`
- Property ZIP: `95825`
- Test sponsor: Willow Creek Home Finance
- Test date: October 20, 2026

## Eligibility Test Results
| Test scenario | Expected result | Actual result | Status |
|---|---|---|---|
| Exact ZIP match | Sponsor qualifies when property and sponsor ZIP codes match | Willow Creek Home Finance returned for ZIP `95825` | PASS |
| Nearby ZIP match | Sponsor qualifies when the property is within the permitted radius | Distance was 3.08 miles; allowed radius was 5 miles; sponsor returned by full eligibility query | PASS |
| Inactive sponsor | Sponsor is excluded when `is_active = false` | No rows returned | PASS |
| Expired campaign | Sponsor is excluded when campaign end date is in the past | No rows returned | PASS |
| Equal-priority tie | Selection is deterministic regardless of candidate order | Vitest passed | PASS |
| No eligible candidates | Selection returns `null` | Vitest passed | PASS |

## Automated Test Evidence
Command: `npx vitest run src/lib/sponsors/select-sponsor.test.ts`
Results:
- 3 tests passed.
- Highest-priority sponsor selected.
- Equal-priority selection remained stable when candidates were reordered.
- Empty candidate list returned `null`.

## Notes
- Geographic eligibility uses ZIP-center coordinates stored in `public.zip_locations`.
- Manual SQL tests were performed in the development database.
- Automated selection tests use Vitest.
- The four database eligibility scenarios should eventually be converted into repeatable automated tests.
- The sponsor's active status and unrestricted campaign dates were restored after testing.

## Sponsor Click Redirect Tests
- Valid sponsor click: Passed — redirected to https://example.com.
- Click tracking: Passed — one record inserted into sponsor_clicks.
- Invalid sponsor UUID: Passed — HTTP 400 response.
- Unauthorized sponsor UUID: Passed — HTTP 403 response.
- Missing property ID: Passed — HTTP 400 response.
- Rejected click tracking: Passed — click count remained at 1.

## Adversarial Test: Duplicate Sponsor Candidates
### Edge Case
The same sponsor ID appears multiple times in the candidate list.
### Initial Result
Failed. Duplicate entries changed the rotation result for some property IDs, giving repeated sponsors an unfair advantage.

### Fix
Updated selectSponsor() to deduplicate highest-priority
candidates by sponsor ID using a Map before rotation.

### Verification
Ran the duplicate-sponsor test across 100 property IDs. Final result: All 4 sponsor selection tests passed.
Files Updated:
- src/lib/sponsors/select-sponsor.ts
- src/lib/sponsors/select-sponsor.test.ts

## Adversarial Test: Input Immutability
### Edge Case
Sponsor candidates arrive in an unsorted array.

### Expected Behavior
selectSponsor() must not modify the original candidates array.

### Result
Passed. The original candidate order remained unchanged.

### Verification
Ran all five sponsor selection tests using Vitest. Final result: 5 tests passed, 0 failed.

### Code Changes
No changes to selectSponsor() were necessary.

## Adversarial Test: Negative Sponsor Priorities
### Edge Case
Two sponsor candidates have negative priority values:
- Sponsor A: -10
- Sponsor B: -5

### Expected Behavior
The sponsor with the mathematically higher priority (-5)
should be selected.

### Result
Passed. Sponsor B was selected.

### Verification
Ran all six sponsor selection tests using Vitest. Final result: 6 tests passed, 0 failed.

### Code Changes
No changes to selectSponsor() were necessary.

## Adversarial Test: Zero Priority
### Edge Case
Two sponsor candidates have priorities of -5 and 0.

### Expected Behavior
The sponsor with priority 0 should be selected because
0 is mathematically greater than -5.

### Result
Passed. Sponsor B (priority 0) was selected.

### Verification
Ran all seven sponsor selection tests using Vitest. Final result: 7 tests passed, 0 failed.

### Code Changes
No changes to selectSponsor() were necessary.

## Adversarial Test: Deterministic Sponsor Selection
### Edge Case
The same property and placement request is processed repeatedly
with two equally ranked sponsor candidates.

### Expected Behavior
The selection function must return the same sponsor when
the inputs remain unchanged.

### Result
Passed. All 100 repeated selections returned the same sponsor.

### Verification
Ran all eight sponsor selection tests using Vitest. Final result: 8 tests passed, 0 failed.

### Code Changes
No changes to selectSponsor() were necessary.

## Sponsor Eligibility Query Performance
### Query
EXPLAIN (ANALYZE, BUFFERS) was executed against
public.get_eligible_sponsors() for a test property.

### Results
- Execution time: 26.246 ms
- Planning time: 0.069 ms
- Eligible sponsors returned: 1
- Shared buffer hits: 1,143
- Execution plan: Function Scan

### Dataset Size
- Properties: 3
- Sponsors: 2
- Property sponsors: 1
- ZIP locations: 2

### Existing Indexes
Relevant indexes already exist on:
- properties.id
- sponsors.id
- property_sponsors(property_id, sponsor_id)
- property_sponsors.sponsor_id
- zip_locations.zip_code

### Index Decision
No additional indexes were added. The dataset is very small, and the existing indexes support the main relationship lookups. Additional indexes are not justified by the current measurements.

## Three-Property Sponsor Demonstration
### Property 1: 123 Willow Creek Lane
- Property ID: PROP-TEST-001
- Expected: Willow Creek Home Finance
- Actual: Willow Creek Home Finance
- Sponsored disclosure: Visible
- Result: PASS

### Property 2: 123 Example Lane
- Property ID: PROP-API-TEST-001
- Expected: Willow Creek Home Finance
- Actual: Willow Creek Home Finance
- Sponsored disclosure: Visible
- Result: PASS

### Property 3: 456 Test Street
- Property ID: PROP-TEST-002
- Expected: House fallback message
- Actual: Neighborhood Listing Platform house message
- Sponsored disclosure: Not displayed
- Result: PASS

### Conclusion
All three property detail pages displayed the expected sponsor selection outcomes. The application correctly distinguishes eligible sponsored content from the neutral fallback message.