# neighborhood-listing-platform
neighborhood-listing-platform

App
├── SearchFilters
├── PropertyListingGrid
│   ├── PropertyCard
│   ├── PropertyCard
│   └── PropertyCard
└── SponsorBanner

Step 2: Interface Review

AI Studio initially generated detailed interfaces containing property
agents, multiple images, listing statuses, callbacks, and banner tracking.

I removed those fields because the assignment does not require those
features. I kept the fields needed to display the property heading,
address, price, facts, image, descriptive alt text, and details link.

All retained fields are required because every sample property and
sponsor needs them to render complete and accessible content.

# Google AI Studio
export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSizeAcres?: number;
  yearBuilt?: number;
  garageSpaces?: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  altText: string;
  isPrimary?: boolean;
}

export interface PropertyAgent {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  agencyName?: string;
}

export type PropertyListingType = 'sale' | 'rent';

export type PropertyStatus = 'active' | 'pending' | 'contingent' | 'sold';

export type PropertyType =
  | 'single-family'
  | 'condo'
  | 'townhouse'
  | 'multi-family'
  | 'land'
  | 'commercial';

export interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  currency?: string;
  listingType: PropertyListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  address: PropertyAddress;
  specs: PropertySpecs;
  images: PropertyImage[];
  isFeatured?: boolean;
  isSaved?: boolean;
  agent?: PropertyAgent;
  onSelect?: (propertyId: string) => void;
  onSaveToggle?: (propertyId: string, isSaved: boolean) => void;
  className?: string;
}

export type BannerPlacement = 'header' | 'sidebar' | 'in-feed' | 'footer';

export interface SponsorBannerProps {
  id: string;
  sponsorName: string;
  headline: string;
  description?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  targetUrl: string;
  ctaText?: string;
  badgeLabel?: string;
  placement?: BannerPlacement;
  isExternalLink?: boolean;
  onImpression?: (bannerId: string) => void;
  onClick?: (bannerId: string) => void;
  className?: string;
}


## Keyboard Accessibility Test

The page was tested without using a mouse.

Property type - Tab and arrow keys - Pass
Maximum price - Tab and arrow keys - Pass
Search button - Tab, Enter, and Space - Pass
First property link - Tab and Enter - Pass
Second property link - Tab and Enter - Pass
Third property link - Tab and Enter - Pass
Sponsor link - Tab and Enter - Pass 
Reverse navigation - Shift+Tab - Pass 
Visible focus indicator - Visual inspection - Pass
Logical focus order - Keyboard inspection - Pass

## AI Review Decisions

Check heading order - Inspected headings in browser - Already implemented
Add focus indicators - Tested using Tab - Already implemented
Add form error messages - Submitted form with invalid input - To be addressed
Add descriptive alt text - Inspected each property image - Already implemented

## Accessibility Corrections

After reviewing the ChatGPT and Gemini suggestions, each recommendation
was verified through browser and keyboard testing.

1. Focus-visible styles were already present on interactive elements.
2. Heading order was verified as h1, h2, and h3.
3. Every property image has descriptive alternative text.
4. Every form control has a visible, connected label.
5. Property and sponsor links have descriptive accessible names.
6. Form error messaging was not added because both filters are optional and every available selection is valid.
7. Lighthouse reported an accessibility score of 100.