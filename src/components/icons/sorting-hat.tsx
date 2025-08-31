import * as React from "react";

export function SortingHatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      {/* ala del sombrero */}
      <path d="M3 18c2.5 2 15.5 2 18 0" strokeWidth={2} strokeLinecap="round" />
      {/* hendidura del ala */}
      <path d="M6 18c2-1.6 10-1.6 12 0" strokeWidth={2} strokeLinecap="round" />
      {/* copa del sombrero (punta caída) */}
      <path
        d="M12 3c-2 1-3 3-3 5 0 2-1.2 3.2-5 5h16c-3.8-1.8-5-3-5-5 0-2-1-4-3-5z"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
