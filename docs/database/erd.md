# Database Entity-Relationship Diagram
It supports property listings, sponsors, user profiles, and inquiries while preserving the existing property data contract.
## Entity-Relationship Diagram
erDiagram
    PROFILES ||--o{ PROPERTIES : owns
    PROPERTIES ||--o{ PROPERTY_SPONSORS : has
    SPONSORS ||--o{ PROPERTY_SPONSORS : sponsors
    PROPERTIES ||--o{ INQUIRIES : receives
    PROFILES o|--o{ INQUIRIES : submits

    PROFILES {
        uuid id PK
        text display_name
        text role
        timestamptz created_at
        timestamptz updated_at
    }
    PROPERTIES {
        uuid id PK
        uuid owner_id FK
        text property_id UK
        text address
        text city
        text state
        text zip_code
        numeric price
        integer bedrooms
        numeric bathrooms
        integer square_feet
        text[] amenities
        text status
        timestamptz created_at
        timestamptz updated_at
    }
    SPONSORS {
        uuid id PK
        text business_name
        text category
        text website_url
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }
    PROPERTY_SPONSORS {
        uuid property_id PK, FK
        uuid sponsor_id PK, FK
        timestamptz created_at
    }
    INQUIRIES {
        uuid id PK
        uuid property_id FK
        uuid profile_id FK
        text message
        text status
        timestamptz created_at
        timestamptz updated_at
    }

## Entity Responsibilities
- Profiles: Stores application profile information and the role associated with a user.
- Properties: Stores listing details and identifies the profile that owns each property.
- Sponsors: Stores sponsor business information and whether the sponsor is active.
- PropertySponsors:Joins properties and sponsors to support a many-to-many relationship.
- Inquiries: Stores messages about properties and optionally associates each inquiry with a profile.

## Keys and Relationships
- Each entity has a primary key.
- properties.owner_id references profiles.id.
- properties.property_id is a unique business identifier that can correspond to the existing data contract's property_id.
- property_sponsors.property_id references properties.id.
- property_sponsors.sponsor_id references sponsors.id.
- The combination of property_sponsors.property_id and property_sponsors.sponsor_id is the composite primary key.
- inquiries.property_id references properties.id.
- inquiries.profile_id references profiles.id and may be null to support anonymous inquiries.

## Items to Review Before Creating Migrations
- Confirm the allowed property statuses and sponsor categories.
- Decide whether anonymous inquiries are permitted.
- Decide what should happen to inquiries and sponsor associations when a property is deleted.
- Confirm whether amenities should remain a PostgreSQL text array or become normalized tables.
- Confirm the database provider and its authentication model before implementing policies.
