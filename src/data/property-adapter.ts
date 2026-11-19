import type { Property, PropertyContract } from "../types";

const propertyImages: Record<string, string> = {
  "PROP-CA-101": "/images/fictional-home-1.webp",
  "PROP-CA-102": "/images/fictional-home-2.webp",
  "PROP-CA-103": "/images/fictional-home-3.webp",
  "PROP-CA-104": "/images/fictional-home-1.webp",
  "PROP-CA-105": "/images/fictional-home-2.webp",
};

const propertyDetails: Record<string, string> = {
  "PROP-CA-101":
    "https://www.realtor.com/realestateandhomes-detail/12500-Huston-St-Apt-104_Valley-Village_CA_91607_M28654-41008",
  "PROP-CA-102":
    "https://www.realtor.com/realestateandhomes-detail/1150-Santa-Rosa-Blvd-Unit-322_Fort-Walton-Beach_FL_32548_M69233-65642",
  "PROP-CA-103":
    "https://www.realtor.com/realestateandhomes-detail/301-Summit-Dr_Destin_FL_32541_M64071-59703",
  "PROP-CA-104":
    "https://www.realtor.com/realestateandhomes-detail/603-N-Las-Palmas-Ave_Los-Angeles_CA_90004_M22400-02843",
  "PROP-CA-105":
    "https://www.realtor.com/realestateandhomes-detail/15012-Wyandotte-St_Van-Nuys_CA_91405_M28431-41453",
};

export function toPropertyCard(
  property: PropertyContract
): Property {
  return {
    id: property.property_id,
    title: `${property.bedrooms}-Bedroom Property`,
    address: `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    squareFeet: property.square_feet,
    imageUrl:
      propertyImages[property.property_id] ??
      "/property-placeholder.svg",
    imageAlt: propertyImages[property.property_id]
      ? "AI-generated illustration of a fictional residential property"
      : "Property image unavailable",

    detailsUrl: propertyDetails[property.property_id],
  };
}