import React, { ReactNode, createContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>({
  theme: "dark",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  const toggleTheme = ():void => {
    console.log('toggle theme...');
    console.log('current theme: ', theme);

    if (theme === 'light') {
      setTheme('dark')
      localStorage.theme = 'dark'
    }
    if (theme === 'dark') {
      setTheme('light')
      localStorage.theme = 'light'
    }
  };

  useEffect(() => {
    console.log('theme changed! theme is now: ')
    console.log('in app: ', theme)
    console.log('local storage: ', localStorage.theme)
  }, [theme])

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark').matches)){
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;