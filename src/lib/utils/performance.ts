import { useEffect, useState } from "react";

/**
 * Defers execution until after main components have loaded
 * Great for non-critical operations
 */
export function useDeferredExecution(delay = 1000) {
  const [shouldExecute, setShouldExecute] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback when browser is idle, or setTimeout as fallback
    const id =
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(
            () => {
              setShouldExecute(true);
            },
            { timeout: delay }
          )
        : setTimeout(() => {
            setShouldExecute(true);
          }, delay);

    return () => {
      if ("requestIdleCallback" in window) {
        (window as any).cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, [delay]);

  return shouldExecute;
}

/**
 * Removes expensive CSS animations when multiple animations are running
 * to prevent frame drops
 */
export function useAnimationLimiter(threshold = 3) {
  useEffect(() => {
    const limitAnimations = () => {
      const animatingElements = document.querySelectorAll(".motion-animate");
      // If too many animations happening at once, simplify the animations
      if (animatingElements.length > threshold) {
        document.documentElement.classList.add("reduce-animations");
      } else {
        document.documentElement.classList.remove("reduce-animations");
      }
    };

    // Set up mutation observer to detect when animations start/stop
    const observer = new MutationObserver(limitAnimations);
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });

    limitAnimations(); // Initial check

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reduce-animations");
    };
  }, [threshold]);
}

/**
 * Enables intersection based loading for any component
 */
export function useIntersectionLoading(
  options = { threshold: 0.1, rootMargin: "200px" }
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin]);

  return { ref: setRef, isVisible };
}
