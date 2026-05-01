// "use client";

// import { useEffect, useState } from "react";

// export default function ScrollProgress() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const update = () => {
//       const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//       const max = scrollHeight - clientHeight;
//       setProgress(max > 0 ? scrollTop / max : 0);
//     };
//     window.addEventListener("scroll", update, { passive: true });
//     update();
//     return () => window.removeEventListener("scroll", update);
//   }, []);

//   return (
//     <div
//       className="pointer-events-none fixed left-0 right-0 top-0 z-[300] h-[2px]"
//       aria-hidden
//     >
//       <div
//         className="h-full origin-left bg-gradient-to-r from-primary via-primary-container to-inverse-primary"
//         style={{
//           transform: `scaleX(${progress})`,
//           boxShadow: progress > 0.01 ? "0 0 8px rgba(167,139,250,0.7)" : "none",
//         }}
//       />
//     </div>
//   );
// }
