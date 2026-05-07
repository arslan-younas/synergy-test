"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "./buyerTour.types";

interface BuyerTourChatProps {
  open: boolean;
  messages: ChatMessage[];
  input: string;
  suggestions: string[];
  onClose: () => void;
  onInputChange: (val: string) => void;
  onAsk: (text: string) => void;
}

export default function BuyerTourChat({
  open,
  messages,
  input,
  suggestions,
  onClose,
  onInputChange,
  onAsk,
}: BuyerTourChatProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`absolute right-[22px] bottom-[82px] z-[22] w-[330px] max-h-[420px] flex flex-col border border-[rgba(20,17,13,0.2)] bg-[rgba(255,255,255,0.97)] transition-[opacity,transform] duration-200 max-[980px]:left-[14px] max-[980px]:right-[14px] max-[980px]:w-auto max-sm:left-2 max-sm:right-2 max-sm:bottom-[54px] max-sm:max-h-[56vh] ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[10px] pointer-events-none"}`}
    >
      <div className="flex justify-between items-start p-3 border-b border-[rgba(20,17,13,0.12)]">
        <div className="text-base max-sm:text-sm">
          Aria<small className="block mt-[2px] font-mono text-[9px] text-[#6b6354] tracking-[0.1em]">Tour assistant · grounded in scan</small>
        </div>
        <button className="border-0 bg-transparent cursor-pointer text-2xl leading-none" onClick={onClose} type="button">×</button>
      </div>
      <div className="p-3 overflow-y-auto flex flex-col gap-2 min-h-[140px] max-h-[220px] max-sm:max-h-[140px] max-sm:min-h-[80px]" ref={bodyRef}>
        {messages.map((msg, idx) => (
          <div
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            key={`${msg.role}-${idx}`}
          >
            <div
              className={`max-w-[90%] border border-[rgba(20,17,13,0.12)] px-[10px] py-2 text-[13px] leading-[1.4] max-sm:text-xs max-sm:px-2 max-sm:py-[6px] ${msg.role === "user" ? "bg-[#14110d] text-[#f3efe7]" : "bg-[rgba(20,17,13,0.04)]"}`}
            >{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-[10px] flex flex-wrap gap-[6px] max-sm:px-2 max-sm:pb-2 max-sm:gap-1">
        {suggestions.map((q) => (
          <button
            key={q}
            className="border border-[rgba(20,17,13,0.12)] bg-transparent px-2 py-[5px] text-[10px] font-mono cursor-pointer max-sm:text-[9px] max-sm:px-[6px] max-sm:py-1"
            onClick={() => onAsk(q)}
            type="button"
          >
            {q}
          </button>
        ))}
      </div>
      <div className="flex gap-2 p-3 border-t border-[rgba(20,17,13,0.12)] max-sm:p-2 max-sm:gap-[6px]">
        <input
          className="flex-1 border border-[rgba(20,17,13,0.18)] bg-transparent px-[9px] py-[7px] text-xs"
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAsk(input)}
          placeholder="Could my 92-inch sofa fit?"
          value={input}
        />
        <button
          className="border border-[rgba(20,17,13,0.18)] bg-[#14110d] text-[#f3efe7] px-[11px] py-[7px] font-mono text-[10px] tracking-[0.12em] uppercase cursor-pointer max-sm:px-[10px] max-sm:py-[6px] max-sm:text-[9px]"
          onClick={() => onAsk(input)}
          type="button"
        >Ask</button>
      </div>
    </div>
  );
}
