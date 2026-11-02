import { z } from 'zod';

export const US_STATE_CODES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
] as const;

export const ListingSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  bedrooms: z.number().int().nonnegative('Bedrooms cannot be negative'),
  state: z.enum(US_STATE_CODES, {
    message: 'Invalid US state code',
  }),
  price: z.number().positive('Price must be greater than 0'),
});

export const SponsorCategoryEnum = z.enum([
  'Mortgage Lender',
  'Insurance Agent',
  'Home Inspector',
  'Real Estate Attorney',
  'Title Company',
]);

export const SponsorSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Sponsor name is required'),
  category: SponsorCategoryEnum,
  active: z.boolean(),
});

export type Listing = z.infer<typeof ListingSchema>;
export type Sponsor = z.infer<typeof SponsorSchema>;