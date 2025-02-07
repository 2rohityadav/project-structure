import { createContext } from "react";
import type { TreeContextType } from "../models/TreeContextType";

export const TreeContext = createContext<TreeContextType | undefined>(
  undefined
);
