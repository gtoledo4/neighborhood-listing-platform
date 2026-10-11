# 001: Data Contract

## Context

The Neighborhood Listing Platform needs a consistent data contract for property listings so that property cards, property details, sponsor selection, and voice-friendly responses can use the same validated data. The project uses AI-generated synthetic property records, so the generated data needs to be validated before it is used by the application. The contract needs to define required fields, data types, valid ranges, allowed sponsor categories, and restrictions on unexpected fields.

## Decision

I will use a JSON Schema as the primary data contract for generated property records. The schema requires: property_id, address, city, state, zip_code, price, bedrooms, bathrooms, square_feet, amenities, and local_sponsors. The schema uses validation constraints including: nonnegative values for price, bedrooms, bathrooms, and square feet, two-letter uppercase state codes, five-digit ZIP codes, minimum string lengths, controlled sponsor category values and additionalProperties: false.The generated records are validated with AJV before being used by the application. TypeScript interfaces are maintained for the validated contract and sponsor data. An adapter converts the contract-based property records into the existing property shape used by the UI components. This allows the original three properties and the five new validated roperties to be rendered together. For amenities, the current contract will use an array of controlled string values rather than unrestricted free text, a relational many-to-many Amenities and PropertyAmenities design was considered.

## Alternatives

Free-text amenities: Amenities could be stored as unrestricted strings. This would be simple, but it could result in inconsistent values such as "Wi-Fi", "Wifi", and "wifi". It would also make filtering and searching less reliable.
Controlled amenity values: A predefined set of amenity values can provide consistency while keeping the current JSON structure simple it provides stronger data consistency without requiring a database relationship or additional infrastructure.
Amenities and PropertyAmenities join tables: A normalized relational design could use an Amenities table and a PropertyAmenities join table this would support advanced filtering and additional metadata about the relationship between a property and an amenity.

## Consequences

The JSON Schema provides a single documented contract for the generated property data and allows malformed records to be detected before they reach the UI. AJV validation provides clear errors for invalid records, including missing required fields, negative values, invalid ZIP codes, and unexpected properties. The TypeScript contract and adapter allow the new data contract to work with the existing components. Using controlled amenity values improves consistency, but the current JSON array does not provide the same normalization or relationship metadata that a relational join table would provide.