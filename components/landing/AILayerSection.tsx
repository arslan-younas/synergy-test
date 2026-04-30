"use client";

import { useEffect, useRef, useState } from "react";
import { revealY } from "./tw";

const SCRIPTS = [
  {
    question: "Could a king bed fit in the master?",
    answer: "Yes — master is 14×16ft. A king fits with 3ft clearance on both sides.",
  },
  {
    question: "How's the natural light in the living room?",
    answer: "South-facing windows. Strong light coverage from 10am through the afternoon.",
  },
  {
    question: "Is the north wall load-bearing?",
    answer: "Yes. North and south walls are load-bearing — confirmed from the LiDAR structural data.",
  },
  {
    question: "What's the ceiling height in the hallway?",
    answer: "8ft 4in. Standard furniture and fixtures will clear without issue.",
  },
  {
    question: "Could my sectional fit near the entry?",
    answer: "An 8ft sectional fits with clear walking paths near both entry points.",
  },
] as const;

type DemoPhase = 1 | 2 | 3 | 4 | 5;
type Exchange = { id: number; question: string; answer: string };

const bullets: { svg: React.ReactNode; text: React.ReactNode }[] = [
  {
    svg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5.5" stroke="#A78BFA" />
        <path d="M7 3.5v3.5l2.3 1.5" stroke="#A78BFA" strokeLinecap="round" />
      </svg>
    ),
    text: (
      <>
        <strong className="font-medium text-brand-text">Grounded in the real scan</strong> — room dimensions, layouts, and adjacencies from the actual LiDAR capture. No
        hallucinations.
      </>
    ),
  },
  {
    svg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <rect x="1.5" y="1.5" width="11" height="11" rx="1" stroke="#A78BFA" />
        <path d="M4 7h6M7 4v6" stroke="#A78BFA" strokeLinecap="round" />
      </svg>
    ),
    text: (
      <>
        <strong className="font-medium text-brand-text">Furniture fit, ceiling heights, natural light</strong> — all answerable before the buyer asks you.
      </>
    ),
  },
  {
    svg: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2 11L7 2l5 9" stroke="#A78BFA" strokeLinecap="round" />
        <path d="M4 8h6" stroke="#A78BFA" strokeLinecap="round" />
      </svg>
    ),
    text: (
      <>
        <strong className="font-medium text-brand-text">Agent dashboard</strong> tracks every question your buyers ask — intel for the offer conversation.
      </>
    ),
  },
];

export default function AILayerSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasStartedRef = useRef(false);
  const inViewRef = useRef(false);
  const scriptIndexRef = useRef(0);
  const phaseRef = useRef<DemoPhase>(1);
  const inputTextRef = useRef("");
  const answerTextRef = useRef("");
  const resumeCurrentPhaseRef = useRef<() => void>(() => {});
  const startRoundRef = useRef<(index: number) => void>(() => {});
  const [scriptIndex, setScriptIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>(1);
  const [inputText, setInputText] = useState("");
  const [questionBubble, setQuestionBubble] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [history, setHistory] = useState<Exchange[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showStreamCursor, setShowStreamCursor] = useState(false);
  const [questionEntered, setQuestionEntered] = useState(false);
  const historyWrapRef = useRef<HTMLDivElement | null>(null);

  const addTimer = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runPhase5 = (currentScriptIndex: number) => {
    if (!inViewRef.current) return;
    setPhase(5);
    phaseRef.current = 5;
    addTimer(() => {
      if (!inViewRef.current) return;
      const nextIndex = (currentScriptIndex + 1) % SCRIPTS.length;
      setHistory((prev) => [...prev.slice(-4), { id: Date.now(), question: SCRIPTS[currentScriptIndex].question, answer: SCRIPTS[currentScriptIndex].answer }]);
      setQuestionBubble(null);
      setAnswerText("");
      answerTextRef.current = "";
      setInputText("");
      inputTextRef.current = "";
      setIsThinking(false);
      setIsStreaming(false);
      setShowStreamCursor(false);
      setQuestionEntered(false);
      startRoundRef.current(nextIndex);
    }, 1800);
  };

  const runPhase4 = (currentScriptIndex: number) => {
    if (!inViewRef.current) return;
    setPhase(4);
    phaseRef.current = 4;
    setIsThinking(false);
    setIsStreaming(true);
    setShowStreamCursor(true);

    const words = SCRIPTS[currentScriptIndex].answer.split(" ");
    const typedWords = answerTextRef.current.trim() ? answerTextRef.current.trim().split(" ").length : 0;

    const revealWord = (i: number) => {
      if (!inViewRef.current) return;
      if (i >= words.length) {
        setIsStreaming(false);
        addTimer(() => {
          if (!inViewRef.current) return;
          setShowStreamCursor(false);
          runPhase5(currentScriptIndex);
        }, 400);
        return;
      }
      const next = words.slice(0, i + 1).join(" ");
      setAnswerText(next);
      answerTextRef.current = next;
      addTimer(() => revealWord(i + 1), 72);
    };

    revealWord(typedWords);
  };

  const runPhase3 = (currentScriptIndex: number) => {
    if (!inViewRef.current) return;
    setPhase(3);
    phaseRef.current = 3;
    setIsThinking(true);
    addTimer(() => runPhase4(currentScriptIndex), 1100);
  };

  const runPhase2 = (currentScriptIndex: number) => {
    if (!inViewRef.current) return;
    setPhase(2);
    phaseRef.current = 2;
    setInputText("");
    inputTextRef.current = "";
    setQuestionBubble(SCRIPTS[currentScriptIndex].question);
    setQuestionEntered(false);
    addTimer(() => setQuestionEntered(true), 16);
    addTimer(() => runPhase3(currentScriptIndex), 250);
  };

  const runPhase1 = (currentScriptIndex: number) => {
    if (!inViewRef.current) return;
    setPhase(1);
    phaseRef.current = 1;
    setIsThinking(false);
    setIsStreaming(false);
    setShowStreamCursor(false);
    setQuestionBubble(null);
    setAnswerText("");
    answerTextRef.current = "";
    setQuestionEntered(false);
    const question = SCRIPTS[currentScriptIndex].question;
    const typedChars = inputTextRef.current.length;

    const typeChar = (i: number) => {
      if (!inViewRef.current) return;
      if (i >= question.length) {
        runPhase2(currentScriptIndex);
        return;
      }
      const next = question.slice(0, i + 1);
      setInputText(next);
      inputTextRef.current = next;
      addTimer(() => typeChar(i + 1), 38);
    };

    typeChar(typedChars);
  };

  function startRound(index: number) {
    setScriptIndex(index);
    scriptIndexRef.current = index;
    hasStartedRef.current = true;
    runPhase1(index);
  }

  const resumeCurrentPhase = () => {
    clearTimers();
    if (!hasStartedRef.current) {
      startRoundRef.current(scriptIndexRef.current);
      return;
    }
    if (phaseRef.current === 1) {
      runPhase1(scriptIndexRef.current);
      return;
    }
    if (phaseRef.current === 2) {
      runPhase2(scriptIndexRef.current);
      return;
    }
    if (phaseRef.current === 3) {
      runPhase3(scriptIndexRef.current);
      return;
    }
    if (phaseRef.current === 4) {
      runPhase4(scriptIndexRef.current);
      return;
    }
    runPhase5(scriptIndexRef.current);
  };
  useEffect(() => {
    resumeCurrentPhaseRef.current = resumeCurrentPhase;
  });
  useEffect(() => {
    startRoundRef.current = startRound;
  });
  useEffect(() => {
    if (!historyWrapRef.current) return;
    historyWrapRef.current.scrollTop = historyWrapRef.current.scrollHeight;
  }, [history, questionBubble, answerText, isThinking]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inViewRef.current = true;
          resumeCurrentPhaseRef.current();
          return;
        }
        inViewRef.current = false;
        clearTimers();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, []);

  return (
    <section
      id="ai"
      className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-16 px-6 py-[70px] lg:grid-cols-2 lg:gap-[72px] lg:px-[52px] lg:py-[120px]"
    >
      <div>
        <span className="mb-3.5 inline-block rounded-full border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.08)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-violet">
          The AI layer
        </span>
        <h2 className="font-serif text-[clamp(30px,3.4vw,50px)] font-normal leading-tight tracking-[-0.02em]">
          Every question.
          <br />
          <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text font-medium italic text-transparent">Answered instantly.</em>
        </h2>
        <p className="mx-auto mb-0 ml-0 mr-auto mt-5 max-w-[500px] text-[14.5px] leading-relaxed text-black/60 lg:mx-0">
          An LLM grounded in your tour&apos;s spatial metadata answers buyer questions in real time — before you even read the text. Zero competitors have shipped
          this.
        </p>
        <div className="mt-9 flex flex-col gap-5">
          {bullets.map((b, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-violet bg-brand-violet/10">{b.svg}</div>
              <p className="text-[13.5px] leading-relaxed text-black/60">{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        id="demo-win"
        ref={cardRef}
        data-reveal
        className={`${revealY} overflow-hidden rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel shadow-[0_32px_72px_-34px_rgba(23,26,43,0.24)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-3 border-b border-black/10 bg-white/70 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <span className="ml-1 flex-1 font-mono text-[10.5px] tracking-[0.08em] text-black/55">synergyso.ai · 123 Oak Street, Brooklyn NY</span>
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live demo
          </div>
        </div>
        <div id="demo-chat" ref={historyWrapRef} className="h-[260px] overflow-y-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-h-full flex-col justify-end gap-2.5">
            {history.map((item) => (
              <div key={item.id} className="contents">
                <div className="max-w-[82%] self-end rounded-[12px] rounded-br-[3px] border border-[rgba(129,140,248,0.28)] bg-[rgba(129,140,248,0.13)] px-3.5 py-2.5 text-[12.5px] leading-snug text-[rgba(129,140,248,0.95)]">
                  {item.question}
                </div>
                <div className="max-w-[88%] rounded-[12px] rounded-bl-[3px] border border-black/10 bg-black/[0.02] px-3.5 py-2.5 text-[12.5px] leading-snug text-black/80">
                  <div className="mb-[6px] flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-black/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SYNERGYSO AI
                  </div>
                  {item.answer}
                </div>
              </div>
            ))}

            {questionBubble && (
              <div
                className={`max-w-[82%] self-end rounded-[12px] rounded-br-[3px] border border-[rgba(129,140,248,0.28)] bg-[rgba(129,140,248,0.13)] px-3.5 py-2.5 text-[12.5px] leading-snug text-[rgba(129,140,248,0.95)] transition-all duration-250 ${
                  questionEntered ? "translate-y-0 opacity-100" : "translate-y-[6px] opacity-0"
                }`}
              >
                {questionBubble}
              </div>
            )}

            {(isThinking || answerText) && (
              <div className="max-w-[88%] rounded-[12px] rounded-bl-[3px] border border-black/10 bg-black/[0.02] px-3.5 py-2.5 text-[12.5px] leading-snug text-black/80">
                <div className="mb-[6px] flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-black/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYNERGYSO AI
                </div>
                {isThinking ? (
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={`thinking-dot-${dot}`}
                        className="h-[5px] w-[5px] rounded-full bg-black/35 animate-pulse"
                        style={{ animationDelay: `${dot * 160}ms` }}
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    {answerText}
                    {showStreamCursor && (
                      <span className="ml-0.5 animate-pulse text-[rgba(129,140,248,0.8)]">
                        |
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-2">
          {SCRIPTS.map((_, index) => (
            <span
              key={`progress-dot-${index}`}
              className="h-1 w-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === scriptIndex ? "rgba(129,140,248,0.85)" : "rgba(23,26,43,0.18)",
                transform: index === scriptIndex ? "scale(1.3)" : "scale(1)",
                boxShadow: index === scriptIndex ? "0 0 8px rgba(129,140,248,0.7)" : "none",
              }}
            />
          ))}
        </div>
        <div className="flex gap-2 border-t border-black/10 bg-white/70 px-4 py-3">
          <input
            id="demo-in"
            type="text"
            value={inputText}
            readOnly
            placeholder="Ask anything about this home..."
            className="pointer-events-none min-w-0 flex-1 border-0 bg-transparent font-mono text-[12px] text-black/80 outline-none placeholder:text-black/30"
          />
          {phase === 1 && <span className="self-center animate-pulse text-[rgba(129,140,248,0.8)]">|</span>}
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
            style={{
              backgroundColor: isThinking || isStreaming ? "rgba(129,140,248,0.3)" : "rgba(129,140,248,0.85)",
            }}
          >
            <span className="text-[12px] leading-none">→</span>
          </span>
        </div>
      </div>
    </section>
  );
}
