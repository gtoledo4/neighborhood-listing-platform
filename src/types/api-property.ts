export interface ApiProperty {
  id: string;
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
}

export interface ListingsApiResponse {
  listings: ApiProperty[];
}