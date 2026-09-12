export type Listing = {
  id: string;
  title: string;
  address: string;
  description: string;
};

export const listings: Listing[] = [
  {
    id: "1",
    title: "Listings",
    address: "Neighborhood Resources",
    description:
      "Discover useful places, services, and resources available in your neighborhood.",
  },
  {
    id: "2",
    title: "Neighborhood Sponsors",
    address: "Local Community Partners",
    description:
      "Learn about local businesses and organizations that support the neighborhood.",
  },
  {
    id: "3",
    title: "Voice Help",
    address: "Neighborhood Assistance",
    description:
      "Get help finding neighborhood information and resources through voice assistance.",
  },
];