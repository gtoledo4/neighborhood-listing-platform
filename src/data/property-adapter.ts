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
    imageUrl: propertyImages[property.property_id],
    imageAlt: `Property listing for ${property.address}`,
    detailsUrl: propertyDetails[property.property_id],
  };
}