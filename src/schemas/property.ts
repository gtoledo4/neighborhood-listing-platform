import { z } from 'zod';

export const propertySchema = z.object({
  property_id: z.string().trim().min(1),
  address: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().length(2),
  zip_code: z.string().regex(/^\d{5}$/),
  price: z.number().nonnegative(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  square_feet: z.number().int().positive(),
  amenities: z.array(z.string().trim().min(1)).default([]),
}).strict();

export type PropertyInput = z.infer<typeof propertySchema>;
