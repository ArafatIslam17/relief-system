import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Notification links stored before the dashboard moved under /dashboard keep working. */
  async redirects() {
    return [
      { source: "/conflicts/:id", destination: "/dashboard/conflicts?id=:id", permanent: true },
      { source: "/duplicates/:id", destination: "/dashboard/duplicates?pair=:id", permanent: true },
      { source: "/flags/:id", destination: "/dashboard/duplicates?tab=flags&flag=:id", permanent: true },
      { source: "/households/:code", destination: "/dashboard/households?code=:code", permanent: true },
      { source: "/admin/users", destination: "/dashboard/admin?tab=users", permanent: true },
      { source: "/admin/organisations", destination: "/dashboard/admin?tab=organisations", permanent: true },
      { source: "/operation/memberships", destination: "/dashboard/admin?tab=memberships", permanent: true },
      { source: "/operation", destination: "/dashboard/operations", permanent: true },
      { source: "/field/unserved", destination: "/field/distribute", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // The service worker must always be revalidated so fixes reach devices.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/manifest.json",
        headers: [{ key: "Content-Type", value: "application/manifest+json" }],
      },
    ];
  },
};

export default nextConfig;
