export type SponsorUrlValidationResult =
  | { success: true; destination: URL }
  | {
      success: false;
      error: "Invalid sponsor destination" | "Sponsor destination is not allowed";
    };

export function validateSponsorUrl(
  websiteUrl: string
): SponsorUrlValidationResult {
  let destination: URL;

  try {
    destination = new URL(websiteUrl);
  } catch {
    return {
      success: false,
      error: "Invalid sponsor destination",
    };
  }

  if (
    destination.protocol !== "https:" ||
    destination.username ||
    destination.password ||
    destination.hostname === "localhost" ||
    destination.hostname.endsWith(".localhost") ||
    destination.hostname.endsWith(".local") ||
    destination.hostname === "127.0.0.1" ||
    destination.hostname === "::1"
  ) {
    return {
      success: false,
      error: "Sponsor destination is not allowed",
    };
  }

  return {
    success: true,
    destination,
  };
}