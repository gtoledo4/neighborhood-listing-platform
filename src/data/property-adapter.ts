import type { Property, PropertyContract } from "../types";

const propertyImages: Record<string, string> = {
  "PROP-CA-101":
    "https://ap.rdcpix.com/9fcf21996cc2642356a898c6fd6d3606l-m3293057726rd-w1280_h960.webp",
  "PROP-CA-102":
    "https://ap.rdcpix.com/6c4910c86951fea3edbd8a019ae35109l-m1568860118rd-w1280_h960.webp",
  "PROP-CA-103":
    "https://ap.rdcpix.com/6c08b35e3420333c4cd43c86f9cc73a7l-m1961397752rd-w1280_h960.webp",
  "PROP-CA-104":
    "https://ap.rdcpix.com/da643992a276cb71209f4112481e7cb7l-m3358023999rd-w1280_h960.webp",
  "PROP-CA-105":
    "https://ap.rdcpix.com/39228f6043b0fa2ac36c060d8d623b06l-m866614356rd-w1280_h960.webp",
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
    imageUrl: propertyImages[property.property_id],
    imageAlt: `Property listing for ${property.address}`,
    detailsUrl: "#",
  };
}