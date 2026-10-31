"use client";

import { useEffect, useRef } from "react";

interface SponsorImpressionTrackerProps {
  sponsorId: string;
  propertyId: string;
  placement: "property_card" | "property_detail";
}

export default function SponsorImpressionTracker({
  sponsorId,
  propertyId,
  placement,
}: SponsorImpressionTrackerProps) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;

    if (!marker) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        observer.disconnect();

        void fetch("/api/sponsor-impressions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sponsorId,
            propertyId,
            placement,
          }),
        }).catch((error) => {
          console.error("Sponsor impression request failed:", error);
        });
      },
      { threshold: 0 }
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [sponsorId, propertyId, placement]);

  return (
    <span
      ref={markerRef}
      aria-hidden="true"
      className="block h-px"
    />
  );
}