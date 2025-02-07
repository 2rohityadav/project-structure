import { useState, ReactNode } from "react";
import { TreeContext } from "./TreeContext";

interface TreeProviderProps {
  children: ReactNode;
}

export const TreeProvider = ({ children }: TreeProviderProps) => {
  const [globalExpanded, setGlobalExpanded] = useState(false);

  const toggleGlobalExpanded = () => {
    setGlobalExpanded((prev) => !prev);
  };

  return (
    <TreeContext.Provider value={{ globalExpanded, toggleGlobalExpanded }}>
      {children}
    </TreeContext.Provider>
  );
};
