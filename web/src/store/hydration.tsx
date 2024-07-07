"use client";

import React from "react";

export const Hydrated = ({ children }: { children: React.ReactNode }) => {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setHydrated(true);
    }
  }, []);

  return hydrated ? children : <div></div>;
};
