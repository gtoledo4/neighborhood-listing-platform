# Sponsor Eligibility Rules
## Eligibility Requirements
1. The sponsor must be approved by an administrator.
2. The sponsor must have an active status.
3. The sponsor must be approved for the requested placement, such as a property card or property detail page.
4. The current date must fall within the sponsor's campaign start and end dates.
5. The sponsor must serve the property's ZIP code or fall within the permitted geographic radius.

## No Eligible Sponsor
When no sponsor meets all requirements, the platform displays a neutral house message instead of a paid sponsor.

## Fair Housing and Privacy
Sponsor selection must use only approved geographic and placement information. It must not use sensitive personal characteristics, inferred traits, or caller identity to target housing-related advertisements.

## Sponsor Selection and Tie-Breaking
When multiple sponsors meet all eligibility requirements, the system selects the sponsor with the highest priority value. If two or more eligible sponsors share the highest priority, the system uses a stable rotation based on the property identifier and placement. The same inputs produce the same selection, making the behavior predictable and testable. The rotation must not use personal information, caller identity, or sensitive characteristics. If no sponsor qualifies, the system displays the fallback house message.