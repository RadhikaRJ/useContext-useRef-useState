import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext();

export function LocalisationProvider({ children }) {
  const hindi = {
    appTitle: "ईकॉमर्स"
  };

  const english = {
    appTitle: "eCommerce"
  };

  const [currentLanguage, setCurrentLanguage] = useState(english);

  function setLanguage(selectedLanguage) {
    if (selectedLanguage === "hindi") {
      return setCurrentLanguage(hindi);
    }
    if (selectedLanguage === "english") {
      return setCurrentLanguage(english);
    }
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocalisation() {
  return useContext(LanguageContext);
}
