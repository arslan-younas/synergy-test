import type { Room, FurnitureStyleId } from "./buyerTour.types";

export const ROOMS: Room[] = [
  {
    id: "living",
    name: "Living Room",
    italic: "living room",
    imgSrc: "/living_room.webp",
    panoSrc: "/living.jpg",
    bounds: { w: 28, d: 20 },
    ceiling: 14,
    sqft: 560,
    features: ["floor-to-ceiling windows", "14' vaulted ceiling", "stone fireplace", "hardwood floors"],
    hotspots: [
      { px: 45, py: 32, label: "Window wall", kind: "feature", ai: "Full-height glazing across three walls — south and west exposure, forest views all day." },
      { px: 54, py: 68, label: "Sofa zone",   kind: "measure", ai: "Circular sectional arrangement. Clear circulation to fireplace and window wall." },
      { px: 80, py: 52, label: "Fireplace",   kind: "feature", ai: "Stone-clad fireplace with hearth seating. Gas insert, no chimney maintenance." },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    italic: "kitchen",
    imgSrc: "/kitchen.webp",
    panoSrc: "/kitchen.jpg",
    bounds: { w: 26, d: 18 },
    ceiling: 11,
    sqft: 468,
    features: ["waterfall island", "stone accent walls", "floor-to-ceiling windows", "open to dining"],
    hotspots: [
      { px: 16, py: 55, label: "Kitchen run",    kind: "measure", ai: "Full kitchen run with integrated appliances, stone backsplash, and overhead pendant lighting." },
      { px: 42, py: 62, label: "Island & Dining", kind: "measure", ai: "Waterfall island seats 4. Adjacent dining table fits 8 — open plan with clear sight lines." },
      { px: 76, py: 58, label: "Lounge zone",    kind: "feature", ai: "Open lounge flows off the kitchen — sofa, fireplace, and forest-view windows." },
    ],
  },
  {
    id: "bed",
    name: "Bedroom",
    italic: "bedroom",
    imgSrc: "/bedroom.webp",
    panoSrc: "/bedroom.jpg",
    bounds: { w: 20, d: 16 },
    ceiling: 10,
    sqft: 320,
    features: ["floor-to-ceiling windows", "forest views", "built-in shelving", "reading nook"],
    hotspots: [
      { px: 22, py: 65, label: "Bed wall",       kind: "measure", ai: "King bed with floating platform frame. Accent wall and floating shelves behind." },
      { px: 50, py: 38, label: "Window view",    kind: "feature", ai: "Full-height windows face the forest — morning light, no direct sun, very private." },
      { px: 82, py: 58, label: "Desk & shelves", kind: "feature", ai: "Built-in desk and open shelving along the east wall. Natural light from the side window." },
    ],
  },
];

export const WALL_SWATCHES = [
  { name: "Original", hex: null as number | null, color: "#e8e1d2" },
  { name: "Bone",     hex: 0xf2ede0,              color: "#f2ede0" },
  { name: "Sage",     hex: 0xa3b294,              color: "#a3b294" },
  { name: "Clay",     hex: 0xc89a7a,              color: "#c89a7a" },
  { name: "Ink",      hex: 0x2a2a28,              color: "#2a2a28" },
];

export const FLOOR_SWATCHES = [
  { name: "Original", hex: null as number | null, color: "#b8a382" },
  { name: "Walnut",   hex: 0x6d4f33,              color: "#6d4f33" },
  { name: "Marble",   hex: 0xeae5da,              color: "#eae5da" },
  { name: "Stone",    hex: 0x968a76,              color: "#968a76" },
];

export const FURNITURE_STYLES: Array<{ id: FurnitureStyleId; label: string }> = [
  { id: "original", label: "Original" },
  { id: "modern",   label: "Modern"   },
  { id: "cozy",     label: "Cozy"     },
  { id: "none",     label: "Hide"     },
];
