"use client";

import type { FurnitureStyleId } from "./buyerTour.types";
import { WALL_SWATCHES, FLOOR_SWATCHES, FURNITURE_STYLES } from "./buyerTour.constants";
import styles from "./BuyerTourSection.module.css";

interface BuyerTourRedesignProps {
  open: boolean;
  selectedWall: number;
  selectedFloor: number;
  selectedFurniture: FurnitureStyleId;
  onSelectWall: (idx: number) => void;
  onSelectFloor: (idx: number) => void;
  onSelectFurniture: (id: FurnitureStyleId) => void;
  onReset: () => void;
}

export default function BuyerTourRedesign({
  open,
  selectedWall,
  selectedFloor,
  selectedFurniture,
  onSelectWall,
  onSelectFloor,
  onSelectFurniture,
  onReset,
}: BuyerTourRedesignProps) {
  return (
    <aside className={`${styles.redesignBar} ${open ? styles.redesignOpen : ""}`}>
      <h3>Redesign</h3>
      <p>Change finishes. Place furniture. See it live.</p>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Walls</div>
        <div className={styles.swatches}>
          {WALL_SWATCHES.map((s, idx) => (
            <button
              className={`${styles.swatch} ${idx === selectedWall ? styles.swatchActive : ""}`}
              key={s.name}
              onClick={() => onSelectWall(idx)}
              style={{ background: s.color }}
              title={s.name}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Floor</div>
        <div className={styles.swatches}>
          {FLOOR_SWATCHES.map((s, idx) => (
            <button
              className={`${styles.swatch} ${idx === selectedFloor ? styles.swatchActive : ""}`}
              key={s.name}
              onClick={() => onSelectFloor(idx)}
              style={{ background: s.color }}
              title={s.name}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.groupTitle}>Furniture</div>
        <div className={styles.furnRow}>
          {FURNITURE_STYLES.map((f) => (
            <button
              className={selectedFurniture === f.id ? styles.furnBtnActive : ""}
              key={f.id}
              onClick={() => onSelectFurniture(f.id)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <button className={styles.reset} onClick={onReset} type="button">
        Reset to original
      </button>
    </aside>
  );
}
