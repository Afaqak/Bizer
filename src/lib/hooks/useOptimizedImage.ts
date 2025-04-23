import { useState, useEffect } from "react";

type ImageStatus = "loading" | "loaded" | "error";

/**
 * Custom hook for optimized image loading
 *
 * @param src - Image source URL
 * @param options - Optional configuration
 * @returns Image loading status and optimization info
 */
export function useOptimizedImage(
  src: string,
  options: {
    priority?: boolean;
    preload?: boolean;
  } = {}
) {
  const [status, setStatus] = useState<ImageStatus>("loading");
  const { priority = false, preload = false } = options;

  useEffect(() => {
    // Skip if no src provided
    if (!src) {
      setStatus("error");
      return;
    }

    // Reset status when src changes
    setStatus("loading");

    // Preload image
    const img = new Image();
    img.src = src;

    const handleLoad = () => setStatus("loaded");
    const handleError = () => setStatus("error");

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    // Add preload link if needed
    if (preload && typeof document !== "undefined") {
      const linkEl = document.createElement("link");
      linkEl.rel = "preload";
      linkEl.as = "image";
      linkEl.href = src;
      if (priority) {
        linkEl.fetchPriority = "high";
      }
      document.head.appendChild(linkEl);

      return () => {
        document.head.removeChild(linkEl);
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleError);
      };
    }

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src, priority, preload]);

  return {
    status,
    isLoaded: status === "loaded",
    isLoading: status === "loading",
    hasError: status === "error",
  };
}
