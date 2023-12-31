import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [overlay, setOverlay] = useState(false);

  return (
    <AppContext.Provider value={{ overlay, setOverlay}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
