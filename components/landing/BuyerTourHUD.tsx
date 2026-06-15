"use client";

import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import type { Room } from "./buyerTour.types";

interface BuyerTourHUDProps {
  currentRoom: Room;
  currentRoomIdx: number;
  rooms: Room[];
  panMode: boolean;
  visitSeconds: number;
  aiOpen: boolean;
  onRoomSelect: (idx: number) => void;
  onPanToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAiToggle: () => void;
}

export default function BuyerTourHUD({
  currentRoom,
  currentRoomIdx,
  rooms,
  panMode,
  visitSeconds,
  aiOpen,
  onRoomSelect,
  onPanToggle,
  onPrev,
  onNext,
  onAiToggle,
}: BuyerTourHUDProps) {
  const mm = String(Math.floor(visitSeconds / 60)).padStart(2, "0");
  const ss = String(visitSeconds % 60).padStart(2, "0");
  void mm; void ss;

  return (
    <>

      {!panMode && (
        <div className="absolute left-[18px] bottom-6 z-[14] max-w-[380px] px-4 py-[14px] bg-[rgba(255,255,255,0.9)] border border-[rgba(20,17,13,0.14)] max-sm:bottom-[60px] max-sm:left-[10px] max-sm:px-[10px] max-sm:py-2 max-sm:max-w-[calc(100%-20px)]">
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6b6354] mb-1 max-sm:text-[8px]">
            Room {String(currentRoomIdx + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}
          </div>
          <div className="font-display text-[44px] leading-[0.95] text-[#14110d] max-[980px]:text-[30px] max-sm:text-[20px] max-sm:leading-none">
            The <em className="not-italic text-[#c8651a]">{currentRoom.italic}</em>
          </div>
          <div className="mt-[6px] font-mono text-[10px] tracking-[0.06em] text-[#3a342a] max-sm:text-[8px] max-sm:tracking-[0.04em]">
            {currentRoom.bounds.w}&apos; × {currentRoom.bounds.d}&apos; · {currentRoom.ceiling}&apos; ceilings ·{" "}
            <span>{currentRoom.sqft} sq ft</span>
          </div>
        </div>
      )}

      <nav className="absolute right-[18px] top-3 z-[16] w-[190px] border border-[rgba(20,17,13,0.2)] bg-[rgba(255,255,255,0.9)] p-[10px] flex flex-col gap-[6px] max-[980px]:hidden">
        <div className="flex justify-between font-mono text-[9px] tracking-[0.16em] uppercase text-[#6b6354] mb-[6px]">
          <span>Plan</span>
          <span>{rooms.length} rooms</span>
        </div>
        {rooms.map((room, idx) => (
          <button
            className={`flex justify-between w-full border-0 text-left px-1 py-[7px] text-[#3a342a] cursor-pointer ${!panMode && idx === currentRoomIdx ? "bg-[rgba(200,101,26,0.1)]" : "bg-transparent"}`}
            key={room.id}
            onClick={() => onRoomSelect(idx)}
            type="button"
          >
            <span className="text-sm">{room.name}</span>
            <span className="font-mono text-[10px] text-[#6b6354]">{room.sqft} sf</span>
          </button>
        ))}
      </nav>

      <div className="absolute left-1/2 bottom-5 -translate-x-1/2 z-[16] flex gap-2 p-[7px] border border-[rgba(20,17,13,0.18)] bg-[rgba(255,255,255,0.92)] max-[980px]:flex-nowrap max-[980px]:gap-[6px] max-sm:gap-1 max-sm:p-1">
        <button
          className={`inline-flex items-center gap-1.5 border border-[rgba(20,17,13,0.16)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] cursor-pointer max-sm:px-2 max-sm:py-[5px] max-sm:text-[9px] max-sm:tracking-[0.1em] ${panMode ? "bg-[#14110d] text-[#f3efe7]" : "bg-transparent text-[#14110d]"}`}
          onClick={onPanToggle}
          type="button"
        >
          <MoveHorizontal className="h-3 w-3" strokeWidth={2} /> Pan
        </button>
        <button
          className="inline-flex items-center gap-1 border border-[rgba(20,17,13,0.16)] bg-transparent text-[#14110d] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] cursor-pointer max-sm:px-2 max-sm:py-[5px] max-sm:text-[9px] max-sm:tracking-[0.1em]"
          onClick={onPrev}
          type="button"
        ><ChevronLeft className="h-3 w-3" strokeWidth={2.5} /> Prev</button>
        <button
          className="inline-flex items-center gap-1 border border-[rgba(20,17,13,0.16)] bg-transparent text-[#14110d] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] cursor-pointer max-sm:px-2 max-sm:py-[5px] max-sm:text-[9px] max-sm:tracking-[0.1em]"
          onClick={onNext}
          type="button"
        >Next <ChevronRight className="h-3 w-3" strokeWidth={2.5} /></button>
      </div>

      <button
        className={`absolute right-7 bottom-[22px] z-[16] h-[46px] rounded-full border border-[rgba(20,17,13,0.24)] px-[14px] inline-flex items-center gap-[10px] cursor-pointer max-[980px]:right-4 max-sm:bottom-2 max-sm:right-2 max-sm:h-9 max-sm:px-[10px] ${aiOpen ? "bg-[#14110d] text-[#f3efe7]" : "bg-[rgba(255,255,255,0.94)] text-[#14110d]"}`}
        onClick={onAiToggle}
        type="button"
      >
        <span className="w-[22px] h-[22px] rounded-full border border-[rgba(200,101,26,0.5)] text-[#c8651a] inline-flex items-center justify-center font-mono max-sm:w-[18px] max-sm:h-[18px] max-sm:text-[11px]">a</span>
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase max-[980px]:hidden">Ask anything · A</span>
      </button>
    </>
  );
}
