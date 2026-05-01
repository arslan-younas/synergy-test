import type { Room, MaterialRole, FurnitureStyleId } from "./buyerTour.types";

export const ROOMS: Room[] = [
  {
    id: "living",
    name: "Living",
    italic: "living",
    bounds: { x: -11, z: -7, w: 22, d: 14 },
    ceiling: 9.2,
    sqft: 327,
    color: 0xe8e1d2,
    floor: 0xb8a382,
    cameraTarget: { x: -2, y: 2.5, z: -2 },
    cameraOrbit: { x: 9, y: 8, z: 3 },
    features: ["south-facing windows", "9'2\" ceilings", "oak floors"],
    hotspots: [
      { x: -8, y: 5, z: -6.5, label: "Window wall", kind: "feature", ai: "Three south-facing windows, bright afternoon light." },
      { x: 8, y: 4, z: 0, label: "Sofa zone", kind: "measure", ai: "Clear floor area 14'8\" × 9'2\". A 92\" sectional fits." },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    italic: "kitchen",
    bounds: { x: 11, z: -7, w: 14, d: 11 },
    ceiling: 9.2,
    sqft: 156,
    color: 0xeae3d4,
    floor: 0xd8cdb6,
    cameraTarget: { x: 18, y: 2.5, z: -4 },
    cameraOrbit: { x: 18, y: 6, z: 6 },
    features: ["gas range", "island potential", "white oak cabinets"],
    hotspots: [{ x: 18, y: 4, z: -1, label: "Island space", kind: "measure", ai: "A 6-foot island fits with clear circulation." }],
  },
  {
    id: "bath",
    name: "Bathroom",
    italic: "bathroom",
    bounds: { x: -11, z: 7, w: 8, d: 8 },
    ceiling: 8.6,
    sqft: 64,
    color: 0xe6e2db,
    floor: 0xc9c0ad,
    cameraTarget: { x: -7, y: 2, z: 11 },
    cameraOrbit: { x: -7, y: 8, z: 19 },
    features: ["walk-in shower", "north window", "marble vanity"],
    hotspots: [{ x: -7, y: 4, z: 11, label: "Window", kind: "concern", ai: "North-facing small window. Mirror placement helps brighten." }],
  },
  {
    id: "bed",
    name: "Bedroom",
    italic: "bedroom",
    bounds: { x: -3, z: 7, w: 14, d: 10 },
    ceiling: 9,
    sqft: 168,
    color: 0xe2dcca,
    floor: 0xb8a382,
    cameraTarget: { x: 4, y: 2.5, z: 11 },
    cameraOrbit: { x: 5, y: 8, z: 22 },
    features: ["east light", "closet 6 linear feet", "9-foot wall for headboard"],
    hotspots: [{ x: 4, y: 4, z: 11, label: "Bed wall", kind: "measure", ai: "Wall span is 9'0\". King bed fits with room to spare." }],
  },
  {
    id: "office",
    name: "Office",
    italic: "office",
    bounds: { x: 11, z: 7, w: 11, d: 10 },
    ceiling: 8.8,
    sqft: 95,
    color: 0xe9e2d0,
    floor: 0xc9b894,
    cameraTarget: { x: 16.5, y: 2.5, z: 11 },
    cameraOrbit: { x: 21, y: 7.5, z: 20 },
    features: ["8'6\" desk wall", "corner light", "east morning sun"],
    hotspots: [],
  },
];

export const WALL_SWATCHES = [
  { name: "Original", hex: null as number | null, color: "#e8e1d2" },
  { name: "Bone", hex: 0xf2ede0, color: "#f2ede0" },
  { name: "Sage", hex: 0xa3b294, color: "#a3b294" },
  { name: "Clay", hex: 0xc89a7a, color: "#c89a7a" },
  { name: "Ink", hex: 0x2a2a28, color: "#2a2a28" },
];

export const FLOOR_SWATCHES = [
  { name: "Original", hex: null as number | null, color: "#b8a382" },
  { name: "Walnut", hex: 0x6d4f33, color: "#6d4f33" },
  { name: "Marble", hex: 0xeae5da, color: "#eae5da" },
  { name: "Stone", hex: 0x968a76, color: "#968a76" },
];

export const FURNITURE_STYLES: Array<{ id: FurnitureStyleId; label: string }> = [
  { id: "original", label: "Original" },
  { id: "modern", label: "Modern" },
  { id: "cozy", label: "Cozy" },
  { id: "none", label: "Hide" },
];

export const FURN_ROLE_COLORS: Record<MaterialRole, number> = {
  upholstery: 0x8a7558,
  fabric: 0xc4b89c,
  wood: 0x9b7a52,
  woodDark: 0x4a3520,
  metal: 0x3a3530,
  metalBrass: 0xa67c3a,
  stone: 0xeae5da,
  glass: 0xb8c4c4,
  accent: 0xc8651a,
};
