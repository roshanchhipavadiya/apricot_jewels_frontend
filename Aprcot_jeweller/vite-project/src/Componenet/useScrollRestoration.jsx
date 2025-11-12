import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const SCROLL_KEY_PREFIX = "scroll-position:";

const useScrollMemory = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPos = useRef({ x: 0, y: 0 });
  const rere = window.scrollY
  console.log();
  
  scrollPos.current = {
      x: window.scrollX,
      y: rere,
    };
  // ✅ Track scroll in real-time

  // ✅ Store scroll position BEFORE route changes (correct value from ref)
  useEffect(() => {
    const path = location.pathname;

    return () => {
      const { x, y } = scrollPos.current;
      sessionStorage.setItem(`${SCROLL_KEY_PREFIX}${path}`, `x: ${x}, y: ${y}`);
    };
  }, [location.pathname]);

  // ✅ Restore scroll on browser BACK/FORWARD (POP)
  useEffect(() => {
    const key = `${SCROLL_KEY_PREFIX}${location.pathname}`;

    if (navigationType === "POP") {
      const stored = sessionStorage.getItem(key);
      if (stored) {
        const [, x, y] = stored.match(/x:\s*(\d+),\s*y:\s*(\d+)/) || [];
        if (x !== undefined && y !== undefined) {
          requestAnimationFrame(() => {
            window.scrollTo(parseInt(x), parseInt(y));
          });
        }
        sessionStorage.removeItem(key);
      }
    } else {
      // Go to top for PUSH / REPLACE
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);
};

export default useScrollMemory;
