
import type { Sponsor } from "../../types";

type ApprovalStatus = "draft" | "approved" | "rejected" | "expired";

interface ReviewedSponsorContent {
  sponsor: Sponsor;
  status: ApprovalStatus;
  approvedBy: string;
  approvedOn: string;
  expiresOn: string | null;
}

const MAX_SPONSOR_MESSAGE_LENGTH = 120;

const reviewedDemoContent: ReviewedSponsorContent = {
  sponsor: {
    id: "sunshine-mortgage",
    businessName: "Sunshine Mortgage",
    message:
      "Explore financing options for your next home with Sunshine Mortgage.",
    websiteUrl: "https://example.com",
  },
  status: "approved",
  approvedBy: "Lupe Toledo",
  approvedOn: "2026-11-19",
  expiresOn: null,
};

export function getApprovedDemoSponsor(
  now: Date = new Date()
): Sponsor | null {
  const { sponsor, status, expiresOn } = reviewedDemoContent;

  if (status !== "approved") {
    return null;
  }

  if (
    sponsor.message.length === 0 ||
    sponsor.message.length > MAX_SPONSOR_MESSAGE_LENGTH
  ) {
    return null;
  }

  if (expiresOn) {
    const expiration = new Date(`${expiresOn}T23:59:59.999Z`);

    if (
      Number.isNaN(expiration.getTime()) ||
      now.getTime() > expiration.getTime()
    ) {
      return null;
    }
  }

  return sponsor;
}
