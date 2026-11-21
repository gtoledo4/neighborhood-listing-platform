export interface PropertySponsor {
  sponsor_id: string;
  name: string;
  category:
    | "realtor"
    | "mortgage"
    | "insurance"
    | "home_services"
    | "moving";
}

export interface PropertyContract {
  property_id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  amenities: string[];
  local_sponsors: PropertySponsor[];
}