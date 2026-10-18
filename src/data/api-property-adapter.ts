import type { Property } from "../types";
import type { ApiProperty } from "../types/api-property";

export function apiPropertyToCard(
  property: ApiProperty
): Property {
  return {
    id: property.id,
    title: `${property.bedrooms}-Bedroom Property`,
    address: `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    squareFeet: property.square_feet,
    imageUrl: "/property-placeholder.svg",
    imageAlt: `Placeholder image for ${property.address}`,
  };
}