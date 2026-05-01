"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type {
  ProjectedHotspot,
  FloatAnswer,
  ChatMessage,
  FurnitureStyleId,
  MaterialRole,
  Hotspot,
} from "./buyerTour.types";
import { ROOMS, WALL_SWATCHES, FLOOR_SWATCHES, FURN_ROLE_COLORS } from "./buyerTour.constants";
import BuyerTourHUD from "./BuyerTourHUD";
import BuyerTourChat from "./BuyerTourChat";
import BuyerTourRedesign from "./BuyerTourRedesign";
import styles from "./BuyerTourSection.module.css";

export default function BuyerTourSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const roomGroupsRef = useRef<Record<string, THREE.Group>>({});
  const targetPosRef = useRef(new THREE.Vector3());
  const targetLookRef = useRef(new THREE.Vector3());
  const lookRef = useRef(new THREE.Vector3());
  const orbitAngleRef = useRef(-0.5);
  const orbitModeRef = useRef(true);
  const currentRoomRef = useRef(0);
  const pointerRef = useRef({ down: false, x: 0, y: 0, yaw: 0, pitch: 0 });
  const hotspotsRef = useRef<Array<{ id: string; roomId: string; hotspot: Hotspot }>>([]);
  const floatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHudTickRef = useRef(0);
  const lastProjectedSignatureRef = useRef("");
  const initializedRef = useRef(false);
  const runningRef = useRef(false);

  const [currentRoomIdx, setCurrentRoomIdx] = useState(0);
  const [orbitMode, setOrbitMode] = useState(true);
  const [visitSeconds, setVisitSeconds] = useState(0);
  const [projectedHotspots, setProjectedHotspots] = useState<ProjectedHotspot[]>([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi — ask me about dimensions, light, fit, layout, and materials in this room." },
  ]);
  const [redesignOpen, setRedesignOpen] = useState(false);
  const [selectedWall, setSelectedWall] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureStyleId>("original");
  const [floatAnswer, setFloatAnswer] = useState<FloatAnswer>({
    visible: false,
    left: 0,
    top: 0,
    text: "",
  });

  const currentRoom = ROOMS[currentRoomIdx];

  const roomSuggestions = useMemo(() => {
    const map: Record<string, string[]> = {
      living: ["How tall are the ceilings?", "Could a 92-inch sofa fit?", "What's the afternoon light like?"],
      kitchen: ["Is there room for an island?", "How big is the kitchen?", "What finishes are here?"],
      bath: ["How can this room feel brighter?", "How big is the shower?", "Is this wall load-bearing?"],
      bed: ["Will a king bed fit?", "How much wall space is there?", "How does morning light look?"],
      office: ["Desk wall length?", "Could this fit a daybed?", "How bright is it at 9am?"],
    };
    return map[currentRoom.id] ?? [];
  }, [currentRoom.id]);

  const applyRoomHighlight = useCallback((roomId: string, orbit: boolean) => {
    Object.values(roomGroupsRef.current).forEach((group) => {
      const active = group.userData.roomId === roomId;
      group.traverse((node) => {
        const mesh = node as THREE.Mesh;
        if (!mesh.material || !("opacity" in mesh.material)) return;
        if (mesh.userData.kind === "wall") {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.transparent = orbit || !active;
          mat.opacity = orbit ? 0.85 : active ? 1 : 0.55;
        }
      });
    });
  }, []);

  const setRoom = useCallback(
    (idx: number) => {
      const room = ROOMS[idx];
      currentRoomRef.current = idx;
      setCurrentRoomIdx(idx);
      targetPosRef.current.set(room.cameraOrbit.x, room.cameraOrbit.y, room.cameraOrbit.z);
      targetLookRef.current.set(room.cameraTarget.x, room.cameraTarget.y, room.cameraTarget.z);
      pointerRef.current.yaw = 0;
      pointerRef.current.pitch = 0;
      applyRoomHighlight(room.id, orbitModeRef.current);
    },
    [applyRoomHighlight]
  );

  const applyWall = useCallback((hex: number | null) => {
    const room = ROOMS[currentRoomRef.current];
    const group = roomGroupsRef.current[room.id];
    if (!group) return;
    const target = hex ?? room.color;
    group.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.userData.kind === "wall" && mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(target);
      }
    });
  }, []);

  const applyFloor = useCallback((hex: number | null) => {
    const room = ROOMS[currentRoomRef.current];
    const group = roomGroupsRef.current[room.id];
    if (!group) return;
    const target = hex ?? room.floor;
    group.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.userData.kind === "floor" && mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).color.setHex(target);
      }
    });
  }, []);

  const applyFurniture = useCallback((style: FurnitureStyleId) => {
    const group = roomGroupsRef.current[ROOMS[currentRoomRef.current].id];
    if (!group) return;
    group.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.userData.kind !== "furniture" || !mesh.material) return;
      mesh.visible = style !== "none";
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (style === "modern") mat.color.setHex(0x2f2d2a);
      if (style === "cozy") mat.color.setHex(0xb08a6a);
      if (style === "original") {
        const role = mesh.userData.role as MaterialRole | undefined;
        if (role && FURN_ROLE_COLORS[role] !== undefined) mat.color.setHex(FURN_ROLE_COLORS[role]);
      }
    });
  }, []);

  const answerQuestion = useCallback((text: string) => {
    const q = text.toLowerCase();
    const room = ROOMS[currentRoomRef.current];
    if (/(ceiling|how tall|height)/.test(q))
      return `Ceilings in ${room.name} are approximately ${room.ceiling}' from LiDAR scan data.`;
    if (/(sq ft|square|size|how big)/.test(q))
      return `${room.name} is ${room.sqft} sq ft and measures about ${room.bounds.w}' × ${room.bounds.d}'.`;
    if (/(sofa|sectional|couch)/.test(q))
      return room.id === "living"
        ? "Yes. A 92-inch sectional fits with clear circulation."
        : "Living room is best for larger sectional layouts.";
    if (/(light|window|sun)/.test(q)) return `${room.name} features ${room.features.join(", ")}.`;
    if (/(load-bearing|remove wall)/.test(q))
      return "I can infer geometry from the scan, but structural confirmation needs an engineer.";
    return `From this scan: ${room.name} has ${room.ceiling}' ceilings, ${room.sqft} sq ft, and features like ${room.features.slice(0, 2).join(" and ")}.`;
  }, []);

  const askQuestion = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      setAiOpen(true);
      setAiMessages((prev) => [...prev, { role: "user", text }]);
      const response = answerQuestion(text);
      window.setTimeout(() => {
        setAiMessages((prev) => [...prev, { role: "bot", text: response }]);
      }, 260);
      setAiInput("");
    },
    [answerQuestion]
  );

  useEffect(() => {
    orbitModeRef.current = orbitMode;
  }, [orbitMode]);

  useEffect(() => {
    if (!rootRef.current || !canvasRef.current) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;

    let cleanupScene: (() => void) | null = null;

    const loop = () => {
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!renderer || !scene || !camera || !rootRef.current || !runningRef.current) return;

      const room = ROOMS[currentRoomRef.current];
      if (orbitModeRef.current) {
        orbitAngleRef.current += 0.0015;
        const radius = 42;
        targetPosRef.current.set(
          Math.cos(orbitAngleRef.current) * radius,
          15,
          Math.sin(orbitAngleRef.current) * radius
        );
        targetLookRef.current.set(0, 2, 0);
      } else {
        targetPosRef.current.set(room.cameraOrbit.x, room.cameraOrbit.y, room.cameraOrbit.z);
        targetLookRef.current.set(room.cameraTarget.x, room.cameraTarget.y, room.cameraTarget.z);
      }

      camera.position.lerp(targetPosRef.current, 0.05);
      lookRef.current.lerp(targetLookRef.current, 0.06);
      const lookFinal = lookRef.current
        .clone()
        .add(new THREE.Vector3(Math.sin(pointerRef.current.yaw) * 6, pointerRef.current.pitch * 4, 0));
      camera.lookAt(lookFinal);

      if (performance.now() - lastHudTickRef.current > 120) {
        const width = rootRef.current.clientWidth;
        const height = rootRef.current.clientHeight;
        const projected = hotspotsRef.current.map((entry) => {
          const vec = new THREE.Vector3(entry.hotspot.x, entry.hotspot.y, entry.hotspot.z).project(camera);
          const visibleByRoom =
            orbitModeRef.current || entry.roomId === ROOMS[currentRoomRef.current].id;
          const onScreen = vec.x > -1.08 && vec.x < 1.08 && vec.y > -1.08 && vec.y < 1.08;
          return {
            id: entry.id,
            roomId: entry.roomId,
            label: entry.hotspot.label,
            ai: entry.hotspot.ai,
            kind: entry.hotspot.kind,
            left: Math.round((vec.x * 0.5 + 0.5) * width),
            top: Math.round((-vec.y * 0.5 + 0.5) * height),
            visible: visibleByRoom && vec.z <= 1.02 && onScreen,
          };
        });
        const signature = projected
          .map((p) => `${p.id}:${p.left}:${p.top}:${p.visible ? 1 : 0}`)
          .join("|");
        if (signature !== lastProjectedSignatureRef.current) {
          setProjectedHotspots(projected);
          lastProjectedSignatureRef.current = signature;
        }
        lastHudTickRef.current = performance.now();
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(loop);
    };

    const initScene = () => {
      hotspotsRef.current = [];
      roomGroupsRef.current = {};

      const dpr = window.devicePixelRatio;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: dpr <= 1, powerPreference: "high-performance" });
      rendererRef.current = renderer;
      renderer.setPixelRatio(Math.min(dpr, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.setClearColor(0xd8d2c4, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xd8d2c4, 70, 160);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 180);
      camera.position.set(Math.cos(-0.5) * 42, 15, Math.sin(-0.5) * 42);
      cameraRef.current = camera;
      lookRef.current.set(0, 2, 0);
      targetLookRef.current.set(0, 2, 0);

      scene.add(new THREE.AmbientLight(0xfff4e0, 0.35));
      const key = new THREE.DirectionalLight(0xffe6b8, 1.25);
      key.position.set(15, 20, 12);
      key.castShadow = true;
      key.shadow.mapSize.set(512, 512);
      key.shadow.camera.near = 0.5;
      key.shadow.camera.far = 80;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xc9d4e0, 0.15);
      fill.position.set(-15, 10, -8);
      scene.add(fill);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 120),
        new THREE.MeshStandardMaterial({ color: 0xc9c0ad, roughness: 1 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.01;
      ground.receiveShadow = true;
      scene.add(ground);

      ROOMS.forEach((room) => {
        const group = new THREE.Group();
        group.userData.roomId = room.id;
        const roomShell = new THREE.Group();
        roomShell.userData.layer = "shell";
        const roomFurniture = new THREE.Group();
        roomFurniture.userData.layer = "furniture";
        const roomDecor = new THREE.Group();
        roomDecor.userData.layer = "decor";

        const floor = new THREE.Mesh(
          new THREE.BoxGeometry(room.bounds.w, 0.15, room.bounds.d),
          new THREE.MeshStandardMaterial({ color: room.floor, roughness: 0.85 })
        );
        floor.position.set(
          room.bounds.x + room.bounds.w / 2,
          0.075,
          room.bounds.z + room.bounds.d / 2
        );
        floor.receiveShadow = true;
        floor.userData.kind = "floor";
        roomShell.add(floor);

        const cx = room.bounds.x + room.bounds.w / 2;
        const cz = room.bounds.z + room.bounds.d / 2;
        const wallMat = new THREE.MeshStandardMaterial({ color: room.color, roughness: 0.92 });
        const walls = [
          { x: cx, y: room.ceiling / 2, z: room.bounds.z, w: room.bounds.w + 0.18, h: room.ceiling, d: 0.18 },
          { x: cx, y: room.ceiling / 2, z: room.bounds.z + room.bounds.d, w: room.bounds.w + 0.18, h: room.ceiling * 0.35, d: 0.18 },
          { x: room.bounds.x, y: room.ceiling / 2, z: cz, w: 0.18, h: room.ceiling, d: room.bounds.d },
          { x: room.bounds.x + room.bounds.w, y: room.ceiling / 2, z: cz, w: 0.18, h: room.ceiling, d: room.bounds.d },
        ];
        walls.forEach((w) => {
          const wall = new THREE.Mesh(new THREE.BoxGeometry(w.w, w.h, w.d), wallMat.clone());
          wall.position.set(w.x, w.h / 2, w.z);
          wall.castShadow = true;
          wall.receiveShadow = true;
          wall.userData.kind = "wall";
          roomShell.add(wall);
        });

        const rug = new THREE.Mesh(
          new THREE.PlaneGeometry(room.bounds.w * 0.5, room.bounds.d * 0.45),
          new THREE.MeshStandardMaterial({ color: 0x8a7a5e, roughness: 0.95, transparent: true, opacity: 0.35 })
        );
        rug.rotation.x = -Math.PI / 2;
        rug.position.set(cx, 0.151, cz);
        rug.renderOrder = 1;
        roomDecor.add(rug);

        const addFurniture = (
          geometry: THREE.BufferGeometry,
          role: MaterialRole,
          x: number,
          y: number,
          z: number
        ) => {
          const mat = new THREE.MeshStandardMaterial({
            color: FURN_ROLE_COLORS[role],
            roughness: role === "metal" || role === "metalBrass" ? 0.45 : 0.84,
            metalness: role === "metal" || role === "metalBrass" ? 0.65 : 0,
            transparent: role === "glass",
            opacity: role === "glass" ? 0.35 : 1,
          });
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.position.set(x, y, z);
          mesh.castShadow = false;
          mesh.receiveShadow = true;
          mesh.userData.kind = "furniture";
          mesh.userData.role = role;
          roomFurniture.add(mesh);
          return mesh;
        };

        if (room.id === "living") {
          const sofaX = cx - 2;
          const sofaZ = cz - 3.6;
          addFurniture(new THREE.BoxGeometry(7.2, 0.5, 3.2), "woodDark", sofaX, 0.4, sofaZ);
          addFurniture(new THREE.BoxGeometry(7.0, 0.7, 2.6), "upholstery", sofaX, 0.95, sofaZ + 0.2);
          addFurniture(new THREE.BoxGeometry(7.2, 2.0, 0.5), "upholstery", sofaX, 1.7, sofaZ - 1.4);
          addFurniture(new THREE.BoxGeometry(0.5, 1.6, 3.2), "upholstery", sofaX - 3.4, 1.5, sofaZ);
          addFurniture(new THREE.BoxGeometry(0.5, 1.6, 3.2), "upholstery", sofaX + 3.4, 1.5, sofaZ);
          for (let i = -1; i <= 1; i++)
            addFurniture(new THREE.BoxGeometry(2.0, 0.7, 0.5), "fabric", sofaX + i * 2.2, 1.55, sofaZ - 1.05);

          const ctX = sofaX;
          const ctZ = sofaZ + 3.1;
          addFurniture(new THREE.BoxGeometry(4, 0.18, 2), "wood", ctX, 1.3, ctZ);
          [[-1.8, -0.8], [1.8, -0.8], [-1.8, 0.8], [1.8, 0.8]].forEach(([lx, lz]) => {
            addFurniture(new THREE.BoxGeometry(0.2, 1.2, 0.2), "woodDark", ctX + lx, 0.6, ctZ + lz);
          });
          addFurniture(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 8), "accent", ctX - 1.2, 1.67, ctZ);
          addFurniture(new THREE.BoxGeometry(0.8, 0.05, 1.0), "wood", ctX + 0.8, 1.42, ctZ);

          const lpX = sofaX - 4.6;
          const lpZ = sofaZ + 0.6;
          addFurniture(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 8), "metal", lpX, 0.05, lpZ);
          addFurniture(new THREE.CylinderGeometry(0.04, 0.04, 5, 6), "metalBrass", lpX, 2.55, lpZ);
          addFurniture(new THREE.CylinderGeometry(0.5, 0.7, 1, 8, 1, true), "fabric", lpX, 5.3, lpZ);

          const shelfX = cx + 6;
          const shelfZ = cz - 5.7;
          addFurniture(new THREE.BoxGeometry(4, 5.3, 1), "woodDark", shelfX, 2.65, shelfZ);
          addFurniture(new THREE.BoxGeometry(3.8, 0.08, 0.9), "wood", shelfX, 1.3, shelfZ);
          addFurniture(new THREE.BoxGeometry(3.8, 0.08, 0.9), "wood", shelfX, 2.7, shelfZ);
          addFurniture(new THREE.BoxGeometry(3.8, 0.08, 0.9), "wood", shelfX, 4.1, shelfZ);
          for (let i = 0; i < 6; i++) {
            addFurniture(
              new THREE.BoxGeometry(0.24, 0.9 + (i % 2) * 0.2, 0.55),
              "fabric",
              shelfX - 1.4 + i * 0.5,
              1.8,
              shelfZ + 0.05
            );
          }
        }

        if (room.id === "kitchen") {
          const nx = room.bounds.x + 4.5;
          const nz = room.bounds.z + 1;
          addFurniture(new THREE.BoxGeometry(8, 2.6, 1.8), "woodDark", nx, 1.3, nz);
          addFurniture(new THREE.BoxGeometry(8.2, 0.2, 2), "stone", nx, 2.7, nz);
          addFurniture(new THREE.BoxGeometry(8, 2.0, 1.2), "wood", nx, 5.5, nz - 0.2);

          const isX = cx + 1.5;
          const isZ = cz + 1;
          addFurniture(new THREE.BoxGeometry(4.5, 2.6, 2.2), "woodDark", isX, 1.3, isZ);
          addFurniture(new THREE.BoxGeometry(5, 0.2, 2.6), "stone", isX, 2.7, isZ);
          [-1.2, 1.2].forEach((sx) => {
            const sX = isX + sx;
            const sZ = isZ + 2;
            addFurniture(new THREE.CylinderGeometry(0.6, 0.6, 0.2, 8), "wood", sX, 2.5, sZ);
            addFurniture(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 6), "metal", sX, 1.3, sZ);
            addFurniture(new THREE.CylinderGeometry(0.5, 0.5, 0.05, 8), "metal", sX, 0.05, sZ);
          });
          addFurniture(
            new THREE.BoxGeometry(2.8, 6, 2.8),
            "metal",
            room.bounds.x + room.bounds.w - 1.8,
            3,
            room.bounds.z + 1.5
          );
          addFurniture(new THREE.BoxGeometry(2.5, 0.05, 2), "metal", nx - 1, 2.85, nz);
          addFurniture(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 8), "metal", nx - 1.6, 2.92, nz - 0.4);
          addFurniture(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 8), "metal", nx - 0.4, 2.92, nz - 0.4);
          addFurniture(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 8), "metal", nx - 1.6, 2.92, nz + 0.4);
          addFurniture(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 8), "metal", nx - 0.4, 2.92, nz + 0.4);
        }

        if (room.id === "bath") {
          // Walk-in shower — back-left corner using room walls (x=-11, z=7) as two sides
          const shW = 3.0, shD = 3.0, shH = 7.0;
          const shX = room.bounds.x + shW / 2;          // -9.5
          const shZ = room.bounds.z + shD / 2;          // 8.5
          // Shower pan
          addFurniture(new THREE.BoxGeometry(shW, 0.1, shD), "stone", shX, 0.05, shZ);
          // Drain disc
          addFurniture(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 8), "metal", shX + 0.4, 0.1, shZ + 0.4);
          // Right glass panel (open side in x direction, at x=-8)
          addFurniture(new THREE.BoxGeometry(0.12, shH, shD), "glass", room.bounds.x + shW, shH / 2, shZ);
          // Front glass panels with centre door gap (z direction, at z=10)
          addFurniture(new THREE.BoxGeometry(1.0, shH, 0.12), "glass", room.bounds.x + 0.5,       shH / 2, room.bounds.z + shD);
          addFurniture(new THREE.BoxGeometry(1.0, shH, 0.12), "glass", room.bounds.x + shW - 0.5, shH / 2, room.bounds.z + shD);
          // Shower valve on left room wall interior
          addFurniture(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 6), "metalBrass", room.bounds.x + 0.18, 4.0, shZ - 0.4);
          // Shower arm (horizontal pipe along z)
          addFurniture(new THREE.BoxGeometry(0.05, 0.05, 0.55), "metalBrass", room.bounds.x + 0.18, 6.4, shZ - 0.68);
          // Shower head disc
          addFurniture(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8), "metalBrass", room.bounds.x + 0.18, 6.4, shZ - 0.95);

          // Marble vanity — along right wall (x = -3)
          const vDepth = 1.3, vLen = 3.8;
          const vX = room.bounds.x + room.bounds.w - vDepth / 2;  // -3.65
          const vZ = cz;                                           // 11
          // Cabinet
          addFurniture(new THREE.BoxGeometry(vDepth, 2.3, vLen), "woodDark", vX, 1.15, vZ);
          // Marble countertop
          addFurniture(new THREE.BoxGeometry(vDepth + 0.1, 0.1, vLen + 0.1), "stone", vX, 2.35, vZ);
          // Undermount sink basin
          addFurniture(new THREE.BoxGeometry(0.65, 0.14, 1.0), "stone", vX - 0.1, 2.46, vZ);
          // Faucet riser
          addFurniture(new THREE.CylinderGeometry(0.03, 0.03, 0.48, 6), "metalBrass", vX - 0.1, 2.69, vZ - 0.32);
          // Large mirror mounted flush on right wall
          addFurniture(new THREE.BoxGeometry(0.04, 2.7, vLen), "glass", room.bounds.x + room.bounds.w - 0.05, 4.0, vZ);
          // Towel bar on right wall beside mirror
          addFurniture(new THREE.BoxGeometry(0.05, 0.04, 1.2), "metalBrass", room.bounds.x + room.bounds.w - 0.06, 3.3, vZ + vLen / 2 - 0.5);
          // Bath mat in front of vanity
          addFurniture(new THREE.BoxGeometry(0.8, 0.02, 2.0), "fabric", vX - vDepth * 0.7, 0.01, vZ);

          // Toilet — between shower and vanity, flush against back wall (z=7)
          const tX = -6.0;
          const tBowlZ = room.bounds.z + 1.25;           // 8.25
          // Bowl
          addFurniture(new THREE.BoxGeometry(1.2, 0.85, 1.55), "stone", tX, 0.425, tBowlZ);
          // Seat lid
          addFurniture(new THREE.BoxGeometry(1.05, 0.07, 1.3), "stone", tX, 0.895, tBowlZ);
          // Tank against back wall
          addFurniture(new THREE.BoxGeometry(1.0, 1.3, 0.25), "stone", tX, 1.25, room.bounds.z + 0.27);
        }

        if (room.id === "bed") {
          const bdX = cx;
          const bdZ = cz - 1;
          addFurniture(new THREE.BoxGeometry(7, 0.6, 7.5), "woodDark", bdX, 0.4, bdZ);
          addFurniture(new THREE.BoxGeometry(6.6, 1.0, 7.0), "fabric", bdX, 1.2, bdZ);
          addFurniture(new THREE.BoxGeometry(7.2, 3.5, 0.4), "upholstery", bdX, 2.5, bdZ - 3.7);
          addFurniture(new THREE.BoxGeometry(2.5, 0.4, 1.2), "fabric", bdX - 1.5, 1.95, bdZ - 2.7);
          addFurniture(new THREE.BoxGeometry(2.5, 0.4, 1.2), "fabric", bdX + 1.5, 1.95, bdZ - 2.7);
          [-4.5, 4.5].forEach((nsdx) => {
            const nsX = bdX + nsdx;
            const nsZ = bdZ - 3;
            addFurniture(new THREE.BoxGeometry(1.8, 2.0, 1.6), "wood", nsX, 1.0, nsZ);
            addFurniture(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6), "metalBrass", nsX, 2.85, nsZ);
          });
          addFurniture(new THREE.BoxGeometry(5, 0.4, 1.5), "upholstery", bdX, 1.2, bdZ + 4.2);
          addFurniture(
            new THREE.BoxGeometry(1.8, 3.5, 5),
            "wood",
            room.bounds.x + room.bounds.w - 1.5,
            1.75,
            cz + 2
          );
        }

        if (room.id === "office") {
          const dX = cx;
          const dZ = cz - 3.5;
          addFurniture(new THREE.BoxGeometry(6, 0.2, 2.6), "wood", dX, 2.5, dZ);
          addFurniture(new THREE.BoxGeometry(0.15, 2.4, 2.4), "woodDark", dX - 2.9, 1.2, dZ);
          addFurniture(new THREE.BoxGeometry(0.15, 2.4, 2.4), "woodDark", dX + 2.9, 1.2, dZ);
          addFurniture(new THREE.BoxGeometry(3, 1.8, 0.15), "metal", dX - 0.5, 3.7, dZ - 0.5);

          const chX = dX;
          const chZ = dZ + 2.5;
          addFurniture(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8), "metal", chX, 0.05, chZ);
          addFurniture(new THREE.BoxGeometry(1.8, 0.4, 1.8), "upholstery", chX, 1.7, chZ);
          addFurniture(new THREE.BoxGeometry(1.6, 2.2, 0.3), "upholstery", chX, 2.9, chZ - 0.8);
          addFurniture(
            new THREE.BoxGeometry(0.8, 6, 4),
            "woodDark",
            room.bounds.x + room.bounds.w - 0.6,
            3.0,
            cz + 1.5
          );
          addFurniture(
            new THREE.BoxGeometry(0.75, 0.08, 3.8),
            "wood",
            room.bounds.x + room.bounds.w - 0.6,
            2.2,
            cz + 1.5
          );
          addFurniture(
            new THREE.BoxGeometry(0.75, 0.08, 3.8),
            "wood",
            room.bounds.x + room.bounds.w - 0.6,
            3.6,
            cz + 1.5
          );
        }

        group.add(roomShell);
        group.add(roomFurniture);
        group.add(roomDecor);
        scene.add(group);
        roomGroupsRef.current[room.id] = group;

        room.hotspots.forEach((hotspot, idx) => {
          hotspotsRef.current.push({ id: `${room.id}-${idx}`, roomId: room.id, hotspot });
        });
      });

      const onResize = () => {
        if (!rootRef.current || !cameraRef.current || !rendererRef.current) return;
        const width = rootRef.current.clientWidth;
        const height = rootRef.current.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height, false);
      };
      onResize();
      window.addEventListener("resize", onResize);

      const onPointerDown = (e: PointerEvent) => {
        pointerRef.current.down = true;
        pointerRef.current.x = e.clientX;
        pointerRef.current.y = e.clientY;
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!pointerRef.current.down) return;
        const dx = e.clientX - pointerRef.current.x;
        const dy = e.clientY - pointerRef.current.y;
        pointerRef.current.x = e.clientX;
        pointerRef.current.y = e.clientY;
        if (orbitModeRef.current) {
          orbitAngleRef.current -= dx * 0.005;
        } else {
          pointerRef.current.yaw = Math.max(-0.7, Math.min(0.7, pointerRef.current.yaw - dx * 0.003));
          pointerRef.current.pitch = Math.max(-0.4, Math.min(0.4, pointerRef.current.pitch - dy * 0.002));
        }
      };
      const onPointerUp = () => {
        pointerRef.current.down = false;
      };
      const onWheel = (e: WheelEvent) => {
        if (!orbitModeRef.current || !cameraRef.current) return;
        const factor = 1 + e.deltaY * 0.0008;
        cameraRef.current.position.multiplyScalar(factor);
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("wheel", onWheel, { passive: true });

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("wheel", onWheel);
        renderer.dispose();
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!initializedRef.current) {
              cleanupScene = initScene();
              initializedRef.current = true;
              setRoom(0);
            }
            if (!runningRef.current) {
              runningRef.current = true;
              frameRef.current = requestAnimationFrame(loop);
            }
          } else {
            if (runningRef.current) {
              cancelAnimationFrame(frameRef.current);
              runningRef.current = false;
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      runningRef.current = false;
      cleanupScene?.();
    };
  }, [setRoom]);

  useEffect(() => {
    const timer = window.setInterval(() => setVisitSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    currentRoomRef.current = currentRoomIdx;
    applyRoomHighlight(ROOMS[currentRoomIdx].id, orbitMode);
  }, [applyRoomHighlight, currentRoomIdx, orbitMode]);

  const exitOrbitAndGo = useCallback(
    (idx: number) => {
      orbitModeRef.current = false;
      setOrbitMode(false);
      setRoom(idx);
    },
    [setRoom]
  );

  const goPrev = useCallback(() => {
    exitOrbitAndGo((currentRoomIdx - 1 + ROOMS.length) % ROOMS.length);
  }, [currentRoomIdx, exitOrbitAndGo]);

  const goNext = useCallback(() => {
    exitOrbitAndGo((currentRoomIdx + 1) % ROOMS.length);
  }, [currentRoomIdx, exitOrbitAndGo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "a" || e.key === "A") setAiOpen((v) => !v);
      if (e.key === "o" || e.key === "O") setOrbitMode((v) => !v);
      if (e.key === "r" || e.key === "R") setRedesignOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const openSpatialAnswer = useCallback((hotspot: ProjectedHotspot) => {
    if (floatTimerRef.current) clearTimeout(floatTimerRef.current);
    setFloatAnswer({ visible: true, text: hotspot.ai, left: hotspot.left, top: hotspot.top });
    floatTimerRef.current = setTimeout(() => {
      setFloatAnswer((f) => ({ ...f, visible: false }));
    }, 5200);
  }, []);

  const onSelectWall = useCallback(
    (index: number) => {
      setSelectedWall(index);
      applyWall(WALL_SWATCHES[index].hex);
    },
    [applyWall]
  );

  const onSelectFloor = useCallback(
    (index: number) => {
      setSelectedFloor(index);
      applyFloor(FLOOR_SWATCHES[index].hex);
    },
    [applyFloor]
  );

  const onSelectFurniture = useCallback(
    (id: FurnitureStyleId) => {
      setSelectedFurniture(id);
      applyFurniture(id);
    },
    [applyFurniture]
  );

  const resetRedesign = useCallback(() => {
    setSelectedWall(0);
    setSelectedFloor(0);
    setSelectedFurniture("original");
    applyWall(null);
    applyFloor(null);
    applyFurniture("original");
  }, [applyWall, applyFloor, applyFurniture]);

  return (
    <section className={`${styles.wrapper} relative`} id="buyer-tour">
      <div className={styles.tourRoot} ref={rootRef}>
        <canvas className={styles.canvas} ref={canvasRef} />

        <BuyerTourHUD
          aiOpen={aiOpen}
          currentRoom={currentRoom}
          currentRoomIdx={currentRoomIdx}
          floatAnswer={floatAnswer}
          onAiToggle={() => setAiOpen((v) => !v)}
          onHotspotClick={openSpatialAnswer}
          onNext={goNext}
          onOrbitToggle={() => setOrbitMode((v) => !v)}
          onPrev={goPrev}
          onRedesignToggle={() => setRedesignOpen((v) => !v)}
          onRoomSelect={exitOrbitAndGo}
          orbitMode={orbitMode}
          projectedHotspots={projectedHotspots}
          redesignOpen={redesignOpen}
          rooms={ROOMS}
          visitSeconds={visitSeconds}
        />

        <BuyerTourChat
          input={aiInput}
          messages={aiMessages}
          onAsk={askQuestion}
          onClose={() => setAiOpen(false)}
          onInputChange={setAiInput}
          open={aiOpen}
          suggestions={roomSuggestions}
        />

        <BuyerTourRedesign
          onReset={resetRedesign}
          onSelectFloor={onSelectFloor}
          onSelectFurniture={onSelectFurniture}
          onSelectWall={onSelectWall}
          open={redesignOpen}
          selectedFloor={selectedFloor}
          selectedFurniture={selectedFurniture}
          selectedWall={selectedWall}
        />
      </div>
    </section>
  );
}
