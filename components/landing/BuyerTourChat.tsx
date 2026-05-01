"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "./buyerTour.types";
import styles from "./BuyerTourSection.module.css";

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
    <div className={`${styles.aiPanel} ${open ? styles.aiPanelOpen : ""}`}>
      <div className={styles.aiHead}>
        <div className={styles.aiWho}>
          Aria<small>Tour assistant · grounded in scan</small>
        </div>
        <button onClick={onClose} type="button">×</button>
      </div>
      <div className={styles.aiBody} ref={bodyRef}>
        {messages.map((msg, idx) => (
          <div
            className={`${styles.msg} ${msg.role === "user" ? styles.msgUser : styles.msgBot}`}
            key={`${msg.role}-${idx}`}
          >
            <div className={styles.bubble}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className={styles.suggestions}>
        {suggestions.map((q) => (
          <button key={q} onClick={() => onAsk(q)} type="button">
            {q}
          </button>
        ))}
      </div>
      <div className={styles.aiInput}>
        <input
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAsk(input)}
          placeholder="Could my 92-inch sofa fit?"
          value={input}
        />
        <button onClick={() => onAsk(input)} type="button">Ask</button>
      </div>
    </div>
  );
}
