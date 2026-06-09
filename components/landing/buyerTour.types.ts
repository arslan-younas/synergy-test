export type Hotspot = {
  px: number; // % from left edge of panoramic image, 0–100
  py: number; // % from top edge of panoramic image, 0–100
  label: string;
  kind: "feature" | "measure" | "concern";
  ai: string;
};

export type Room = {
  id: string;
  name: string;
  italic: string;
  imgSrc: string;
  panoSrc?: string; // equirectangular 360° image — enables spherical PSV viewer
  bounds: { w: number; d: number };
  ceiling: number;
  sqft: number;
  features: string[];
  hotspots: Hotspot[];
};

export type ProjectedHotspot = {
  id: string;
  roomId: string;
  label: string;
  ai: string;
  kind: Hotspot["kind"];
  left: number;
  top: number;
  visible: boolean;
};

export type FurnitureStyleId = "original" | "modern" | "cozy" | "none";

export type FloatAnswer = {
  visible: boolean;
  left: number;
  top: number;
  text: string;
};

export type ChatMessage = {
  role: "bot" | "user";
  text: string;
};
