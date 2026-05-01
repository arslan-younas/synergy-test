export type Hotspot = {
  x: number;
  y: number;
  z: number;
  label: string;
  kind: "feature" | "measure" | "concern";
  ai: string;
};

export type Room = {
  id: string;
  name: string;
  italic: string;
  bounds: { x: number; z: number; w: number; d: number };
  ceiling: number;
  sqft: number;
  color: number;
  floor: number;
  cameraTarget: { x: number; y: number; z: number };
  cameraOrbit: { x: number; y: number; z: number };
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

export type MaterialRole =
  | "upholstery"
  | "fabric"
  | "wood"
  | "woodDark"
  | "metal"
  | "metalBrass"
  | "stone"
  | "glass"
  | "accent";

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
