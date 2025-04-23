"use client";

import { useEffect, useState } from "react";

interface DeferredScriptProps {
  src: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  priority?: "low" | "auto" | "high";
  strategy?: "afterInteractive" | "lazyOnload" | "onDOMContentLoaded";
}

/**
 * A component for loading non-critical JavaScript files with enhanced control
 * over loading priorities and timing
 */
export default function DeferredScript({
  src,
  id,
  async = true,
  defer = true,
  onLoad,
  priority = "auto",
  strategy = "lazyOnload",
}: DeferredScriptProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    // Check if script is already loaded
    const existingScript = document.getElementById(id || src);
    if (existingScript) {
      setIsLoaded(true);
      onLoad?.();
      return;
    }

    // Helper to create and append the script
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = src;

      if (id) script.id = id;
      script.async = async;
      script.defer = defer;

      // Set priority if browser supports it
      if ("fetchPriority" in HTMLScriptElement.prototype) {
        // @ts-ignore - TypeScript doesn't know about fetchPriority yet
        script.fetchPriority = priority;
      }

      script.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };

      document.body.appendChild(script);
    };

    // Load strategy based on selected option
    if (strategy === "afterInteractive") {
      // Load after page becomes interactive
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        loadScript();
      } else {
        window.addEventListener("DOMContentLoaded", loadScript);
        return () => window.removeEventListener("DOMContentLoaded", loadScript);
      }
    } else if (strategy === "lazyOnload") {
      // Lazy load using Intersection Observer or idle callback
      const onIdle = () => {
        // Use requestIdleCallback for browsers that support it
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(loadScript, { timeout: 2000 });
        } else {
          // Fallback to setTimeout
          setTimeout(loadScript, 1000);
        }
      };

      // Wait until browser is idle or after 2 seconds, whichever comes first
      if (document.readyState === "complete") {
        onIdle();
      } else {
        window.addEventListener("load", onIdle);
        return () => window.removeEventListener("load", onIdle);
      }
    } else {
      // Immediate DOMContentLoaded load
      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", loadScript);
        return () => window.removeEventListener("DOMContentLoaded", loadScript);
      } else {
        loadScript();
      }
    }

    return () => {
      // Cleanup function
    };
  }, [src, id, async, defer, onLoad, priority, strategy, isLoaded]);

  return null;
}
