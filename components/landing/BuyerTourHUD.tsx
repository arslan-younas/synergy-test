"use client";

import type { Room, ProjectedHotspot, FloatAnswer } from "./buyerTour.types";
import styles from "./BuyerTourSection.module.css";

interface BuyerTourHUDProps {
  currentRoom: Room;
  currentRoomIdx: number;
  rooms: Room[];
  orbitMode: boolean;
  visitSeconds: number;
  projectedHotspots: ProjectedHotspot[];
  redesignOpen: boolean;
  aiOpen: boolean;
  floatAnswer: FloatAnswer;
  onRoomSelect: (idx: number) => void;
  onOrbitToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRedesignToggle: () => void;
  onAiToggle: () => void;
  onHotspotClick: (hs: ProjectedHotspot) => void;
}

export default function BuyerTourHUD({
  currentRoom,
  currentRoomIdx,
  rooms,
  orbitMode,
  visitSeconds,
  projectedHotspots,
  redesignOpen,
  aiOpen,
  floatAnswer,
  onRoomSelect,
  onOrbitToggle,
  onPrev,
  onNext,
  onRedesignToggle,
  onAiToggle,
  onHotspotClick,
}: BuyerTourHUDProps) {
  const mm = String(Math.floor(visitSeconds / 60)).padStart(2, "0");
  const ss = String(visitSeconds % 60).padStart(2, "0");

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.mark} />
          <span>Synergy</span>
          <span className={styles.so}>So</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.dot} />
          You&apos;re being shown around <span>{mm}:{ss}</span>
        </div>
      </div>

      {!orbitMode && (
        <div className={styles.hudRoom}>
          <div className={styles.hudNum}>
            Room {String(currentRoomIdx + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}
          </div>
          <div className={styles.hudName}>
            The <em>{currentRoom.italic}</em>
          </div>
          <div className={styles.hudDims}>
            {currentRoom.bounds.w}&apos; × {currentRoom.bounds.d}&apos; · {currentRoom.ceiling}&apos; ceilings ·{" "}
            <span>{currentRoom.sqft} sq ft</span>
          </div>
        </div>
      )}

      <nav className={styles.roomRail}>
        <div className={styles.railTitle}>
          <span>Plan</span>
          <span>{rooms.length} rooms</span>
        </div>
        {rooms.map((room, idx) => (
          <button
            className={!orbitMode && idx === currentRoomIdx ? styles.activeRoomBtn : ""}
            key={room.id}
            onClick={() => onRoomSelect(idx)}
            type="button"
          >
            <span className={styles.rname}>{room.name}</span>
            <span className={styles.rdwell}>{room.sqft} sf</span>
          </button>
        ))}
      </nav>

      <div className={styles.navControls}>
        <button className={orbitMode ? styles.toggled : ""} onClick={onOrbitToggle} type="button">
          ⟲ Orbit
        </button>
        <button onClick={onPrev} type="button">← Prev</button>
        <button onClick={onNext} type="button">Next →</button>
        <button className={redesignOpen ? styles.toggled : ""} onClick={onRedesignToggle} type="button">
          ✦ Redesign
        </button>
      </div>

      {projectedHotspots.map((hs, idx) => (
        <button
          className={`${styles.hotspot} ${hs.kind === "concern" ? styles.hotspotAi : ""}`}
          key={`${hs.id}-${idx}`}
          onClick={() => onHotspotClick(hs)}
          style={{ display: hs.visible ? "block" : "none", left: hs.left, top: hs.top }}
          type="button"
        >
          <span className={styles.hotspotTag}>{hs.label}</span>
        </button>
      ))}

      <button
        className={`${styles.aiOrb} ${aiOpen ? styles.aiOrbOpen : ""}`}
        onClick={onAiToggle}
        type="button"
      >
        <span className={styles.aiGlyph}>a</span>
        <span className={styles.aiLabel}>Ask anything · A</span>
      </button>

      <div
        className={`${styles.floatAnswer} ${floatAnswer.visible ? styles.floatAnswerShow : ""}`}
        style={{ left: floatAnswer.left, top: floatAnswer.top }}
      >
        <span className={styles.src}>From the scan</span>
        <span>{floatAnswer.text}</span>
      </div>
    </>
  );
}
