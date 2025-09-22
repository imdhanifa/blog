/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define the allowed themes
export type Theme = "light" | "dark" ;

// Context type
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Instead of `null`, give it a default value
// This avoids ESLint/TS thinking it might be `undefined`
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {
    throw new Error("setTheme called outside ThemeProvider");
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

useEffect(() => {
  const themes: Theme[] = ["light", "dark"];
  document.documentElement.classList.remove(...themes);
  document.documentElement.classList.add(theme);
}, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
