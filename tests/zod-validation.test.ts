import { describe, it, expect } from 'vitest';
import { ListingSchema, SponsorSchema } from '../src/schemas/listing';

describe('Data Contract Edge Case Validations (Zod)', () => {
  const baseValidListing = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Sunny Suburban Home',
    bedrooms: 3,
    state: 'CA',
    price: 750000,
  };

  const baseValidSponsor = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Premier Lending Group',
    category: 'Mortgage Lender',
    active: true,
  };

  it('rejects listings with negative bedroom counts', () => {
    const invalidPayload = {
      ...baseValidListing,
      bedrooms: -1,
    };

    const result = ListingSchema.safeParse(invalidPayload);

    expect(result.success).toBe(false);
    if (!result.success) {
      const bedroomError = result.error.issues.find((issue) =>
        issue.path.includes('bedrooms')
      );
      expect(bedroomError).toBeDefined();
    }
  });

  it('rejects listings with invalid US state codes', () => {
    const invalidPayload = {
      ...baseValidListing,
      state: 'ZZ',
    };

    const result = ListingSchema.safeParse(invalidPayload);

    expect(result.success).toBe(false);
    if (!result.success) {
      const stateError = result.error.issues.find((issue) =>
        issue.path.includes('state')
      );
      expect(stateError).toBeDefined();
    }
  });

  it('rejects sponsors with invalid categories', () => {
    const invalidPayload = {
      ...baseValidSponsor,
      category: 'Uncertified Contractor',
    };

    const result = SponsorSchema.safeParse(invalidPayload);

    expect(result.success).toBe(false);
    if (!result.success) {
      const categoryError = result.error.issues.find((issue) =>
        issue.path.includes('category')
      );
      expect(categoryError).toBeDefined();
    }
  });

  it('accepts fully valid listing and sponsor payloads', () => {
    const listingResult = ListingSchema.safeParse(baseValidListing);
    const sponsorResult = SponsorSchema.safeParse(baseValidSponsor);

    expect(listingResult.success).toBe(true);
    expect(sponsorResult.success).toBe(true);
  });
});