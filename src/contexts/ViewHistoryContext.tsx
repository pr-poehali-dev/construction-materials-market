import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface ViewHistoryContextType {
  viewHistory: Product[];
  addToHistory: (product: Product) => void;
  clearHistory: () => void;
}

const ViewHistoryContext = createContext<ViewHistoryContextType | undefined>(
  undefined
);

export const ViewHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [viewHistory, setViewHistory] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("viewHistory");
    if (saved) {
      try {
        setViewHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading view history:", error);
      }
    }
  }, []);

  const addToHistory = (product: Product) => {
    setViewHistory((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const newHistory = [product, ...filtered].slice(0, 8);
      localStorage.setItem("viewHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setViewHistory([]);
    localStorage.removeItem("viewHistory");
  };

  return (
    <ViewHistoryContext.Provider
      value={{ viewHistory, addToHistory, clearHistory }}
    >
      {children}
    </ViewHistoryContext.Provider>
  );
};

export const useViewHistory = () => {
  const context = useContext(ViewHistoryContext);
  if (!context) {
    throw new Error("useViewHistory must be used within ViewHistoryProvider");
  }
  return context;
};
