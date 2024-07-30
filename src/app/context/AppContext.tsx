'use client';

import { Result } from '@/interfaces/Result';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  data: Result;
  setData: (data: Result) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Result>();

  const updateData = (newData: Partial<Result>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <AppContext.Provider value={{ data, setData: updateData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};