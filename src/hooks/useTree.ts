import { useContext } from "react";
import { TreeContext } from "../context/TreeContext";

export const useTree = () => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};
