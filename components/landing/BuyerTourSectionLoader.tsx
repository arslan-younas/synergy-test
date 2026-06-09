"use client";

import dynamic from "next/dynamic";

const BuyerTourSection = dynamic(
  () => import("./BuyerTourSection"),
  { ssr: false, loading: () => <div style={{ height: "100vh", background: "#f3efe7" }} /> }
);

export default function BuyerTourSectionLoader() {
  return <BuyerTourSection />;
}
