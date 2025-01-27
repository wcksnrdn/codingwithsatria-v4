"use client";

import { createContext, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null as LocomotiveScroll | null,
});

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: any;
}

export const SmoothScrollProvider = ({
  children,
  options,
}: SmoothScrollProviderProps) => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default;

          const newScroll = new LocomotiveScroll({
            el: document.querySelector("[data-scroll-container]"),
            ...options,
          });

          setScroll(newScroll);
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      if (scroll) {
        scroll.destroy(); // Pastikan scroll ada sebelum memanggil destroy
      }
    };
  }, [options, scroll]);

  return (
    <SmoothScrollContext.Provider
      value={{
        scroll,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
