export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  imageAlt: string;
  detailsUrl: string;
}

export interface Sponsor {
  id: string;
  businessName: string;
  message: string;
  websiteUrl: string;
}