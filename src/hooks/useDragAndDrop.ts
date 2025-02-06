import { useState, DragEvent } from "react";
import { initialStructure } from "../constants/structure";
import { storageService } from "../services/StorageService";
import { moveItem } from "../utils/treeUtils";

export const useDragAndDrop = (
  isFolder: boolean,
  path: string,
  onUpdate: (newStructure: unknown) => void
) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    e.dataTransfer.setData("text/plain", path);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    if (!isFolder) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const sourcePath = e.dataTransfer.getData("text/plain");
    if (sourcePath === path) return;

    const updatedStructure = { ...storageService.load(initialStructure) };
    const newStructure = moveItem(updatedStructure, sourcePath, path);
    onUpdate(newStructure);
  };

  return {
    isDragOver,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
