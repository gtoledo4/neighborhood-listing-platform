export type Listing = {
  id: string;
  title: string;
  address: string;
  description: string;
};

export const listings: Listing[] = [
  {
    id: "1",
    title: "Community Garden",
    address: "123 Main Street",
    description: "A neighborhood garden where residents can grow plants and connect with others.",
  },
  {
    id: "2",
    title: "Local Food Pantry",
    address: "456 Oak Avenue",
    description: "A local resource providing food assistance to families in the neighborhood.",
  },
  {
    id: "3",
    title: "Neighborhood Library",
    address: "789 Pine Road",
    description: "A community library offering books, resources, and local events.",
  },
];