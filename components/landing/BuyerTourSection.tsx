"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FloatAnswer, ChatMessage } from "./buyerTour.types";
import { ROOMS } from "./buyerTour.constants";
import BuyerTourHUD from "./BuyerTourHUD";
import BuyerTourChat from "./BuyerTourChat";

const ReactPhotoSphereViewer = dynamic(
  () => import("react-photo-sphere-viewer").then((m) => ({ default: m.ReactPhotoSphereViewer })),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#1a1613]" /> },
);

const ZOOM_MIN = 1;
const ZOOM_MAX = 6;
const HOTSPOT_ZOOM = 2.5;

export default function BuyerTourSection() {
  const rootRef        = useRef<HTMLDivElement>(null);
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const currentRoomRef = useRef(0);
  const floatTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const zoomRef         = useRef(1);
  const panRef          = useRef({ x: 0, y: 0 });
  const dragging        = useRef(false);
  const dragMoved       = useRef(false);
  const lastPtr         = useRef({ x: 0, y: 0 });
  const pinchStart      = useRef({ dist: 0, zoom: 1 });
  const wheelTargetZoom = useRef(1);
  const velocity        = useRef({ x: 0, y: 0 });
  const momentumRaf     = useRef<number | null>(null);
  const zoomRaf         = useRef<number | null>(null);

  const [currentRoomIdx, setCurrentRoomIdx] = useState(0);
  const [panMode, setPanMode]               = useState(false);
  const [zoomLabel, setZoomLabel]           = useState(1);
  const [visitSeconds, setVisitSeconds]     = useState(0);
  const [aiOpen, setAiOpen]   = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi — ask me about dimensions, light, fit, layout, and materials in this room." },
  ]);
  const [floatAnswer, setFloatAnswer] = useState<FloatAnswer>({
    visible: false, left: 0, top: 0, text: "",
  });
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const currentRoom = ROOMS[currentRoomIdx];

  const roomSuggestions = useMemo(() => {
    const map: Record<string, string[]> = {
      living:  ["How tall are the ceilings?", "Could a 92-inch sofa fit?", "What's the afternoon light like?"],
      kitchen: ["Is there room for an island?", "How big is the kitchen?", "What finishes are here?"],
      bath:    ["How can this room feel brighter?", "How big is the shower?", "Is this wall load-bearing?"],
      bed:     ["Will a king bed fit?", "How much wall space is there?", "How does morning light look?"],
      office:  ["Desk wall length?", "Could this fit a daybed?", "How bright is it at 9am?"],
    };
    return map[currentRoom.id] ?? [];
  }, [currentRoom.id]);

  /* ── transform apply ── */
  const applyPanoTransform = useCallback(() => {
    const w = wrapperRef.current;
    if (!w) return;
    w.style.transition = "none";
    w.style.transform  = `translate(${panRef.current.x}px,${panRef.current.y}px) scale(${zoomRef.current})`;
    w.style.setProperty("--hs-scale", `${1 / zoomRef.current}`);
  }, []);

  const clampPan = useCallback((x: number, y: number, z: number) => {
    const root = rootRef.current;
    if (!root) return { x, y };
    const mx = (root.offsetWidth  * (z - 1)) / 2;
    const my = (root.offsetHeight * (z - 1)) / 2;
    return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
  }, []);

  const stopAllMotion = useCallback(() => {
    if (momentumRaf.current) { cancelAnimationFrame(momentumRaf.current); momentumRaf.current = null; }
    if (zoomRaf.current)     { cancelAnimationFrame(zoomRaf.current);     zoomRaf.current = null;     }
    velocity.current = { x: 0, y: 0 };
  }, []);

  /* smooth rAF zoom+pan to a target — easeOutCubic */
  const animateToZoomAt = useCallback((
    targetZ: number,
    targetPx: number,
    targetPy: number,
    duration = 380,
  ) => {
    if (zoomRaf.current) cancelAnimationFrame(zoomRaf.current);
    const start  = performance.now();
    const fromZ  = zoomRef.current;
    const fromPx = panRef.current.x;
    const fromPy = panRef.current.y;
    const clamped = clampPan(targetPx, targetPy, targetZ);
    const toPx = targetZ <= ZOOM_MIN ? 0 : clamped.x;
    const toPy = targetZ <= ZOOM_MIN ? 0 : clamped.y;
    const raf = (now: number) => {
      const t    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const z    = fromZ  + (targetZ - fromZ)  * ease;
      const px   = fromPx + (toPx   - fromPx)  * ease;
      const py   = fromPy + (toPy   - fromPy)  * ease;
      zoomRef.current = z;
      panRef.current  = { x: px, y: py };
      applyPanoTransform();
      setZoomLabel(z);
      if (t < 1) {
        zoomRaf.current = requestAnimationFrame(raf);
      } else {
        wheelTargetZoom.current = targetZ;
        zoomRaf.current = null;
      }
    };
    zoomRaf.current = requestAnimationFrame(raf);
  }, [applyPanoTransform, clampPan]);

  /* zoom-only shorthand (no pan shift) */
  const animateToZoom = useCallback((target: number, duration = 350) => {
    animateToZoomAt(target, panRef.current.x, panRef.current.y, duration);
  }, [animateToZoomAt]);

  /* instant reset */
  const resetPanoTransform = useCallback(() => {
    stopAllMotion();
    wheelTargetZoom.current = 1;
    zoomRef.current = 1;
    panRef.current  = { x: 0, y: 0 };
    applyPanoTransform();
    setZoomLabel(1);
    setActiveHotspotId(null);
  }, [applyPanoTransform, stopAllMotion]);

  /* commit + CSS-transition for hotspot pan+zoom */
  const commitZoom = useCallback((z: number, px?: number, py?: number, animate = false) => {
    zoomRef.current = z;
    panRef.current  = clampPan(px ?? panRef.current.x, py ?? panRef.current.y, z);
    if (z === ZOOM_MIN) panRef.current = { x: 0, y: 0 };
    const w = wrapperRef.current;
    if (w) {
      w.style.transition = animate ? "transform 0.35s cubic-bezier(.4,0,.2,1)" : "none";
      w.style.transform  = `translate(${panRef.current.x}px,${panRef.current.y}px) scale(${zoomRef.current})`;
      w.style.setProperty("--hs-scale", `${1 / zoomRef.current}`);
    }
    setZoomLabel(z);
  }, [clampPan]);

  /* momentum decay */
  const startMomentum = useCallback(() => {
    if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current);
    const step = () => {
      velocity.current.x *= 0.88;
      velocity.current.y *= 0.88;
      if (Math.abs(velocity.current.x) < 0.4 && Math.abs(velocity.current.y) < 0.4) {
        momentumRaf.current = null;
        return;
      }
      panRef.current = clampPan(
        panRef.current.x + velocity.current.x,
        panRef.current.y + velocity.current.y,
        zoomRef.current,
      );
      applyPanoTransform();
      momentumRaf.current = requestAnimationFrame(step);
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, [applyPanoTransform, clampPan]);


  /* Room change: intro zoom animation */
  useEffect(() => {
    currentRoomRef.current = currentRoomIdx;
    stopAllMotion();
    zoomRef.current = 1.55;
    panRef.current  = { x: 0, y: 0 };
    wheelTargetZoom.current = 1;
    applyPanoTransform();
    setZoomLabel(1.55);
    setFloatAnswer((f) => ({ ...f, visible: false }));
    setActiveHotspotId(null);
    animateToZoomAt(1.0, 0, 0, 1200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoomIdx]);

  // Visit timer
  useEffect(() => {
    const id = window.setInterval(() => setVisitSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  /* hotspot click: CSS-transition zoom+pan to hotspot area */
  const handleHotspotClick = useCallback((hsId: string, px: number, py: number, ai: string) => {
    const root = rootRef.current;
    if (!root) return;
    stopAllMotion();
    const W = root.offsetWidth;
    const H = root.offsetHeight;
    const rawTx = W * (0.5 - px / 100) * HOTSPOT_ZOOM;
    const rawTy = H * (0.5 - py / 100) * HOTSPOT_ZOOM;
    commitZoom(HOTSPOT_ZOOM, rawTx, rawTy, true);
    wheelTargetZoom.current = HOTSPOT_ZOOM;
    setActiveHotspotId(hsId);
    if (floatTimerRef.current) clearTimeout(floatTimerRef.current);
    setFloatAnswer({ visible: true, text: ai, left: W / 2, top: H * 0.44 });
  }, [commitZoom, stopAllMotion]);

  const closeFloatAnswer = useCallback(() => {
    if (floatTimerRef.current) clearTimeout(floatTimerRef.current);
    setFloatAnswer((f) => ({ ...f, visible: false }));
    resetPanoTransform();
  }, [resetPanoTransform]);

  /* ── click-to-zoom: first click zooms in, next click resets ── */
  const onImageClick = useCallback((e: React.MouseEvent) => {
    if (dragMoved.current) return; // was a drag, not a click
    const root = rootRef.current;
    if (!root) return;
    stopAllMotion();

    // if already zoomed → reset
    if (zoomRef.current > 1.05) {
      animateToZoomAt(ZOOM_MIN, 0, 0, 400);
      wheelTargetZoom.current = ZOOM_MIN;
      setActiveHotspotId(null);
      setFloatAnswer((f) => ({ ...f, visible: false }));
      return;
    }

    // zoom 2.5× into the clicked point
    const rect  = root.getBoundingClientRect();
    const cx    = e.clientX - rect.left;
    const cy    = e.clientY - rect.top;
    const W     = root.offsetWidth;
    const H     = root.offsetHeight;
    const nextZ = 2.5;
    const scale = nextZ / zoomRef.current;
    const newPx = panRef.current.x * scale - (cx - W / 2) * (scale - 1);
    const newPy = panRef.current.y * scale - (cy - H / 2) * (scale - 1);
    animateToZoomAt(nextZ, newPx, newPy, 420);
    wheelTargetZoom.current = nextZ;
  }, [animateToZoomAt, stopAllMotion]);

  /* ── mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => {
    stopAllMotion();
    dragging.current  = true;
    dragMoved.current = false;
    velocity.current  = { x: 0, y: 0 };
    lastPtr.current   = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPtr.current.x;
    const dy = e.clientY - lastPtr.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true;
    velocity.current = { x: dx, y: dy };
    lastPtr.current  = { x: e.clientX, y: e.clientY };
    panRef.current   = clampPan(panRef.current.x + dx, panRef.current.y + dy, zoomRef.current);
    applyPanoTransform();
  };
  const onMouseUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    startMomentum();
  };

  /* ── touch ── */
  const touchDist = (t: React.TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  const onTouchStart = (e: React.TouchEvent) => {
    stopAllMotion();
    if (e.touches.length === 1) {
      dragging.current   = true;
      dragMoved.current  = false;
      velocity.current   = { x: 0, y: 0 };
      lastPtr.current    = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      dragging.current   = false;
      pinchStart.current = { dist: touchDist(e.touches), zoom: zoomRef.current };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && dragging.current) {
      const dx = e.touches[0].clientX - lastPtr.current.x;
      const dy = e.touches[0].clientY - lastPtr.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true;
      velocity.current = { x: dx, y: dy };
      lastPtr.current  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panRef.current   = clampPan(panRef.current.x + dx, panRef.current.y + dy, zoomRef.current);
      applyPanoTransform();
    } else if (e.touches.length === 2) {
      const next = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX,
        pinchStart.current.zoom * (touchDist(e.touches) / pinchStart.current.dist)));
      commitZoom(next);
      wheelTargetZoom.current = next;
    }
  };
  const onTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    startMomentum();
  };

  /* ── room navigation ── */
  const selectRoom = useCallback((idx: number) => { setCurrentRoomIdx(idx); }, []);
  const goPrev = useCallback(() => { setCurrentRoomIdx((i) => (i - 1 + ROOMS.length) % ROOMS.length); }, []);
  const goNext = useCallback(() => { setCurrentRoomIdx((i) => (i + 1) % ROOMS.length); }, []);

  /* ── keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goPrev(); }
      if (e.key === "a" || e.key === "A") setAiOpen((v) => !v);
      if (e.key === "p" || e.key === "P") setPanMode((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* ── AI chat ── */
  const answerQuestion = useCallback((text: string) => {
    const q    = text.toLowerCase();
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

  const isPano   = Boolean(currentRoom.panoSrc);
  const isZoomed = !isPano && zoomLabel > 1.05;

  return (
    <section className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] py-10 max-[980px]:py-6 max-sm:py-0 relative" id="buyer-tour">
      <div
        className="relative overflow-hidden h-[clamp(260px,50vw,720px)] border-t border-b border-[rgba(20,17,13,0.12)] bg-[#1a1613]"
        ref={rootRef}
        style={{ cursor: isPano ? "default" : isZoomed ? (dragging.current ? "grabbing" : "grab") : "zoom-in" }}
        onClick={!isPano ? onImageClick : undefined}
        onMouseDown={!isPano ? onMouseDown : undefined}
        onMouseMove={!isPano ? onMouseMove : undefined}
        onMouseUp={!isPano ? onMouseUp : undefined}
        onMouseLeave={!isPano ? onMouseUp : undefined}
        onTouchStart={!isPano ? onTouchStart : undefined}
        onTouchMove={!isPano ? onTouchMove : undefined}
        onTouchEnd={!isPano ? onTouchEnd : undefined}
      >
        {/* Image area — spherical PSV or flat pan/zoom */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {isPano ? (
            <ReactPhotoSphereViewer
              src={currentRoom.panoSrc!}
              height="100%"
              width="100%"
              navbar={false}
              littlePlanet={false}
            />
          ) : (
            <div
              ref={wrapperRef}
              style={{ width: "100%", height: "100%", transformOrigin: "center center", willChange: "transform" }}
            >
              {/* Room images */}
              {ROOMS.map((room, i) => (
                <img
                  key={room.id}
                  src={room.imgSrc}
                  alt={room.name}
                  loading="eager"
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[400ms] ease-in select-none pointer-events-none ${i === currentRoomIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              {/* Hotspot pins — inside wrapper so they scale and pan with the image */}
              {currentRoom.hotspots.map((hs, i) => {
                const id       = `${currentRoom.id}-${i}`;
                const isActive = activeHotspotId === id;
                return (
                  <div
                    key={id}
                    className="absolute z-[12] pointer-events-none"
                    style={{
                      left: `${hs.px}%`,
                      top:  `${hs.py}%`,
                      transform: "translate(-50%,-50%) scale(var(--hs-scale,1))",
                      transformOrigin: "center center",
                    }}
                  >
                    {!isActive && (
                      <span className="absolute -inset-[6px] rounded-full border-[1.5px] border-[rgba(200,101,26,0.5)] animate-hs-pulse pointer-events-none" />
                    )}

                    <div
                      className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap border px-[7px] py-[3px] text-[10px] tracking-[0.08em] font-mono pointer-events-auto cursor-pointer transition-colors duration-150 ${isActive ? "bg-[#14110d] text-[#f3efe7] border-[#14110d]" : "border-[rgba(20,17,13,0.16)] bg-[rgba(255,255,255,0.94)] hover:bg-[#14110d] hover:text-[#f3efe7]"}`}
                      onClick={(e) => { e.stopPropagation(); handleHotspotClick(id, hs.px, hs.py, hs.ai); }}
                    >
                      {hs.label}
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleHotspotClick(id, hs.px, hs.py, hs.ai); }}
                      aria-label={hs.label}
                      className={`relative w-[22px] h-[22px] rounded-full border-2 cursor-pointer p-0 flex items-center justify-center pointer-events-auto transition-colors duration-150 ${
                        isActive
                          ? "bg-[#14110d] text-[#f3efe7] border-[#14110d]"
                          : hs.kind === "concern"
                            ? "border-[#c8651a] text-[#c8651a] bg-[rgba(243,239,231,0.92)] hover:bg-[#c8651a] hover:text-[#f3efe7] hover:border-[#c8651a]"
                            : "border-[#14110d] bg-[rgba(243,239,231,0.92)] text-[#14110d] hover:bg-[#14110d] hover:text-[#f3efe7]"
                      }`}
                      type="button"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8"  x2="12" y2="8"  strokeWidth="3" />
                        <line x1="12" y1="12" x2="12" y2="16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Zoom controls — only for flat viewer */}
        {!isPano && (
          <div className="absolute top-3 left-[18px] z-20 flex flex-col gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); animateToZoom(Math.min(ZOOM_MAX, zoomRef.current * 1.5)); }}
              aria-label="Zoom in"
              className="w-8 h-8 border border-[rgba(20,17,13,0.2)] bg-[rgba(255,255,255,0.9)] text-[#14110d] text-base cursor-pointer flex items-center justify-center p-0 font-mono hover:bg-[#14110d] hover:text-[#f3efe7]"
              type="button"
            >+</button>
            <button
              onClick={(e) => { e.stopPropagation(); animateToZoom(Math.max(ZOOM_MIN, zoomRef.current / 1.5)); }}
              aria-label="Zoom out"
              className="w-8 h-8 border border-[rgba(20,17,13,0.2)] bg-[rgba(255,255,255,0.9)] text-[#14110d] text-base cursor-pointer flex items-center justify-center p-0 font-mono hover:bg-[#14110d] hover:text-[#f3efe7]"
              type="button"
            >−</button>
            {isZoomed && (
              <button
                onClick={(e) => { e.stopPropagation(); resetPanoTransform(); }}
                aria-label="Reset zoom"
                className="w-8 h-8 border border-[rgba(20,17,13,0.2)] bg-[rgba(255,255,255,0.9)] text-[#14110d] text-base cursor-pointer flex items-center justify-center p-0 font-mono hover:bg-[#14110d] hover:text-[#f3efe7]"
                type="button"
              >↺</button>
            )}
          </div>
        )}

        {/* Zoom badge — only for flat viewer */}
        {isZoomed && (
          <div className="absolute top-3 left-[58px] z-20 px-[7px] py-1 border border-[rgba(20,17,13,0.16)] bg-[rgba(255,255,255,0.9)] font-mono text-[10px] tracking-[0.1em] pointer-events-none">
            {Math.round(zoomLabel * 100)}%
          </div>
        )}

        {/* Click hint — flat viewer only, at 1× zoom */}
        {!isPano && !isZoomed && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-[5px] border border-[rgba(255,255,255,0.18)] bg-[rgba(0,0,0,0.38)] font-mono text-[9px] tracking-[0.14em] uppercase text-white/70 pointer-events-none">
            Click anywhere to explore
          </div>
        )}

        {/* Float answer */}
        <div
          className={`absolute z-[24] -translate-x-1/2 -translate-y-[105%] border border-[rgba(20,17,13,0.2)] bg-[rgba(255,255,255,0.98)] p-[10px] max-w-[280px] text-xs leading-[1.4] transition-opacity duration-200 max-sm:max-w-[200px] max-sm:p-2 max-sm:text-[11px] ${floatAnswer.visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ left: floatAnswer.left, top: floatAnswer.top }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#c8651a]">From the scan</span>
            <button
              className="shrink-0 w-[18px] h-[18px] border border-[rgba(20,17,13,0.18)] bg-transparent text-[#6b6354] text-[13px] cursor-pointer flex items-center justify-center p-0 hover:bg-[#14110d] hover:text-[#f3efe7] hover:border-[#14110d]"
              onClick={(e) => { e.stopPropagation(); closeFloatAnswer(); }}
              aria-label="Close"
              type="button"
            >×</button>
          </div>
          <span>{floatAnswer.text}</span>
        </div>

        <BuyerTourHUD
          aiOpen={aiOpen}
          currentRoom={currentRoom}
          currentRoomIdx={currentRoomIdx}
          onAiToggle={() => setAiOpen((v) => !v)}
          onNext={goNext}
          onPanToggle={() => setPanMode((v) => !v)}
          onPrev={goPrev}
          onRoomSelect={selectRoom}
          panMode={panMode}
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
      </div>
    </section>
  );
}
