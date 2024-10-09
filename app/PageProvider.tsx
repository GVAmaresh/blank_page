"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface PageContextType {
  selectedId: number | null;
  updateId: (id: number) => void;
}
const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
      throw new Error("usePageContext must be used within a PageProvider");
    }
    return context;
  };

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const updateId = (id: number) => {
    setSelectedId(id);
  };

  return (
    <PageContext.Provider value={{ selectedId, updateId }}>
      {children}
    </PageContext.Provider>
  );
};
