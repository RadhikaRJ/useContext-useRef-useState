import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const darkTheme = {
    color: "white",
    backgroundColor: "black",
    border: "1px solid white"
  };

  const lightTheme = {
    color: "black",
    backgroundColor: "white",
    border: "1px solid black"
  };

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  function changeTheme(selectedValue) {
    if (selectedValue === "dark") {
      return setCurrentTheme(darkTheme);
    }
    if (selectedValue === "light") {
      return setCurrentTheme(lightTheme);
    }
  }
  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
