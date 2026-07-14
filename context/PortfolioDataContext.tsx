"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchPortfolioData, savePortfolioData } from "@/app/actions";
import { defaultPortfolioData } from "@/lib/initialData";

type DataType = typeof defaultPortfolioData;

interface ContextProps {
  data: DataType;
  loading: boolean;
  updateData: (newData: DataType) => Promise<boolean>;
}

const PortfolioDataContext = createContext<ContextProps>({
  data: defaultPortfolioData,
  loading: true,
  updateData: async () => false,
});

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataType>(defaultPortfolioData);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from Postgres on mount
  useEffect(() => {
    async function load() {
      try {
        const dbData = await fetchPortfolioData();
        if (dbData) {
          setData(dbData);
        }
      } catch (err) {
        console.error("Failed to load portfolio data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateData = async (newData: DataType) => {
    try {
      setData(newData);
      const res = await savePortfolioData(newData);
      return res.success;
    } catch (error) {
      console.error("Error saving portfolio data:", error);
      return false;
    }
  };

  return (
    <PortfolioDataContext.Provider value={{ data, loading, updateData }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export const usePortfolioData = () => useContext(PortfolioDataContext);
