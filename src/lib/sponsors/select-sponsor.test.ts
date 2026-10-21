import { describe, expect, it } from "vitest";
import {
  selectSponsor,
  type SponsorCandidate,
} from "./select-sponsor";

describe("selectSponsor", () => {
  it("selects the eligible sponsor with the highest priority", () => {
    const candidates: SponsorCandidate[] = [
      {
        id: "sponsor-a",
        business_name: "Sacramento Mortgage",
        category: "mortgage",
        website_url: null,
        priority: 5,
      },
      {
        id: "sponsor-b",
        business_name: "Sacramento Insurance",
        category: "insurance",
        website_url: null,
        priority: 10,
      },
    ];

    const result = selectSponsor(
      {
        propertyId: "property-001",
        placement: "property_detail",
      },
      candidates
    );

    expect(result?.id).toBe("sponsor-b");
  });

  it("handles duplicate sponsor candidates consistently", () => {
    const sponsorA: SponsorCandidate = {
      id: "sponsor-a",
      business_name: "Sacramento Mortgage",
      category: "mortgage",
      website_url: null,
      priority: 10,
    };

    const sponsorB: SponsorCandidate = {
      id: "sponsor-b",
      business_name: "Sacramento Insurance",
      category: "insurance",
      website_url: null,
      priority: 10,
    };

    for (let i = 1; i <= 100; i++) {
      const context = {
        propertyId: `property-${i}`,
        placement: "property_detail" as const,
      };

      const uniqueResult = selectSponsor(context, [
        sponsorA,
        sponsorB,
      ]);

      const duplicateResult = selectSponsor(context, [
        sponsorA,
        sponsorB,
        sponsorA,
      ]);

      expect(duplicateResult?.id).toBe(uniqueResult?.id);
    }
  });

  it("selects the same sponsor when tied candidates are reordered", () => {
    const candidates: SponsorCandidate[] = [
      {
        id: "sponsor-a",
        business_name: "Sacramento Mortgage",
        category: "mortgage",
        website_url: null,
        priority: 10,
      },
      {
        id: "sponsor-b",
        business_name: "Sacramento Insurance",
        category: "insurance",
        website_url: null,
        priority: 10,
      },
    ];

    const context = {
      propertyId: "property-001",
      placement: "property_detail" as const,
    };

    const firstResult = selectSponsor(context, candidates);
    const secondResult = selectSponsor(context, [...candidates].reverse());

    expect(firstResult).not.toBeNull();
    expect(secondResult?.id).toBe(firstResult?.id);
  });
  it("returns null when no sponsors are eligible", () => {
    const result = selectSponsor(
      {
        propertyId: "property-001",
        placement: "property_detail",
      },
      []
    );

    expect(result).toBeNull();
  });
  it("does not modify the original candidates array", () => {
    const candidates: SponsorCandidate[] = [
      {
        id: "sponsor-b",
        business_name: "Sacramento Insurance",
        category: "insurance",
        website_url: null,
        priority: 10,
      },
      {
        id: "sponsor-a",
        business_name: "Sacramento Mortgage",
        category: "mortgage",
        website_url: null,
        priority: 10,
      },
    ];

    const originalOrder = candidates.map((sponsor) => sponsor.id);

    selectSponsor(
      {
        propertyId: "property-001",
        placement: "property_detail",
      },
      candidates
    );

    expect(candidates.map((sponsor) => sponsor.id)).toEqual(originalOrder);
  });
  it("selects the highest priority when values are negative", () => {
    const candidates: SponsorCandidate[] = [
      {
        id: "sponsor-a",
        business_name: "Sacramento Mortgage",
        category: "mortgage",
        website_url: null,
        priority: -10,
      },
      {
        id: "sponsor-b",
        business_name: "Sacramento Insurance",
        category: "insurance",
        website_url: null,
        priority: -5,
      },
    ];

    const result = selectSponsor(
      {
        propertyId: "property-001",
        placement: "property_detail",
      },
      candidates
    );

    expect(result?.id).toBe("sponsor-b");
  });
  it("selects zero priority over negative priority", () => {
    const candidates: SponsorCandidate[] = [
      {
        id: "sponsor-a",
        business_name: "Sacramento Mortgage",
        category: "mortgage",
        website_url: null,
        priority: -5,
      },
      {
        id: "sponsor-b",
        business_name: "Sacramento Insurance",
        category: "insurance",
        website_url: null,
        priority: 0,
      },
    ];

    const result = selectSponsor(
      {
        propertyId: "property-001",
        placement: "property_detail",
      },
      candidates
    );

    expect(result?.id).toBe("sponsor-b");
  });
  it("returns the same sponsor across repeated selections", () => {
    const candidates: SponsorCandidate[] = [
      {
        id: "sponsor-a",
        business_name: "Sacramento Mortgage",
        category: "mortgage",
        website_url: null,
        priority: 10,
      },
      {
        id: "sponsor-b",
        business_name: "Sacramento Insurance",
        category: "insurance",
        website_url: null,
        priority: 10,
      },
    ];

    const context = {
      propertyId: "property-001",
      placement: "property_detail" as const,
    };

    const firstResult = selectSponsor(context, candidates);

    for (let i = 0; i < 100; i++) {
      const result = selectSponsor(context, candidates);
      expect(result?.id).toBe(firstResult?.id);
    }
  });
});