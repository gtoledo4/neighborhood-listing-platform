import { describe, expect, it } from "vitest";
import { validateSponsorUrl } from "./validate-sponsor-url";

describe("validateSponsorUrl", () => {
  it("accepts a valid HTTPS sponsor URL", () => {
    const result = validateSponsorUrl("https://example.com");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.destination.href).toBe("https://example.com/");
    }
  });

  it("rejects an unsafe JavaScript URL", () => {
    const result = validateSponsorUrl("javascript:alert(1)");

    expect(result).toEqual({
      success: false,
      error: "Sponsor destination is not allowed",
    });
  });
});