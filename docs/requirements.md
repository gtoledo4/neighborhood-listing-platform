# Sponsor-Backed Property Listing & Inquiry Subsystem
## Story 1 — Property Owner
User Story: As a registered property owner, I want to submit listing drafts so that prospective buyers can review them once verified and approved by administrative staff.
Scope Estimate: Medium

### Acceptance Criteria
Given an authenticated property owner,  
When the owner submits a valid property listing,  
Then the system saves the property with status = draft and links owner_id to the authenticated user's auth.uid().

Given an unauthenticated visitor,  
When the visitor attempts to create a property listing,  
Then the system denies the request and does not create a property record.

Given an authenticated property owner,  
When the owner attempts to modify a property belonging to another owner,  
Then the system denies the modification.

### Traceability
- Database migration: supabase/migrations/20261029140000_exam_schema_persistence.sql
- API route: src/app/api/properties/route.ts — POST
- Security controls: Owner-scoped INSERT and UPDATE policies enforced through PostgreSQL Row-Level Security.
- Verification: Submit a valid property, confirm draft status and ownership, and test unauthorized creation and modification.

## Story 2 — Public Inquirer

User Story: As a prospective neighborhood resident, I want to view approved properties alongside their tier-level sponsors and submit an inquiry without seeing prior inquiries from other users.

Scope Estimate: Large

### Acceptance Criteria

Given an anonymous visitor,  
When the visitor requests property listings,  
Then the system returns only properties with status = 'approved' and their associated active sponsors, including each sponsor's tier (gold, silver, or bronze).

Given an anonymous visitor,  
When the visitor submits an inquiry with a valid email address and a message containing at least 10 characters,  
Then the system saves the inquiry successfully.

Given an anonymous visitor,  
When the visitor attempts to view existing inquiries,  
Then the system does not return those records.

### Traceability

- Database migration: supabase/migrations/20261029140000_exam_schema_persistence.sql
- API route: src/app/api/properties/route.ts — GET
- Inquiry route: To be implemented or identified during the API development phase.
- Security controls: Public read policies for approved properties and active sponsors; inquiry INSERT access without public SELECT access.
- Verification: Confirm approved listings are visible, draft listings are hidden, inquiries can be submitted, and existing inquiries cannot be viewed by anonymous users.

## Story 3 — Platform Administrator
User Story: As a platform administrator, I want full override authority across all records and tables to conduct compliance audits.

**Scope Estimate:** Large

### Acceptance Criteria
Given an authenticated administrator with verified administrative privileges,  
When the administrator requests records from the five database tables,  
Then the system allows the administrator to read those records for compliance auditing.

Given an authenticated administrator with verified administrative privileges,  
When the administrator updates a property's approval status,  
Then the system saves the authorized change. Administrators can also perform authorized insert, update, and delete operations across all five tables through elevated server-side execution.

Given a user without administrative privileges,  
When the user attempts to perform an administrator-only operation,  
Then the system denies the operation.

### Traceability
- Database migration: supabase/migrations/20261029140000_exam_schema_persistence.sql
- API route: src/app/api/properties/route.ts — property operations; an administrative route will be required for full override operations.
- Security controls: Verified administrator privileges and server-side elevated execution. The service-role key must never be exposed to the browser.
- Verification: Confirm authorized administrator reads and writes across all five tables and verify that non-administrators cannot perform these operations.