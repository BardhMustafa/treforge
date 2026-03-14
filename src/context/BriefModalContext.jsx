import { createContext, useContext, useState } from "react";

const BriefModalContext = createContext(null);

export function BriefModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <BriefModalContext.Provider value={{ open, openBrief: () => setOpen(true), closeBrief: () => setOpen(false) }}>
      {children}
    </BriefModalContext.Provider>
  );
}

export function useBriefModal() {
  return useContext(BriefModalContext);
}
