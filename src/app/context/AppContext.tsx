'use client';

import { Result } from '@/interfaces/Result';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AppContextProps {
  data: Result;
  setData: (data: Result) => void;
  token: string;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Result>({currentTime: 1});
  const [token, setToken] = useState(Cookies.get('jwtToken') || '');

  const updateData = (newData: Partial<Result>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data])
  
  const saveToken = (newToken) => {
    Cookies.set('jwtToken', newToken, { expires: 1, secure: true, sameSite: 'Strict' });
    setToken(newToken);
  };

  const removeToken = () => {
    Cookies.remove('jwtToken');
    setToken('');
  };

  return (
    <AppContext.Provider value={{ data, setData: updateData, token, saveToken, removeToken }}>
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