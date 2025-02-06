import { useState, useCallback, useEffect } from "react";
import { storageService } from "../services/StorageService";
import { convertToMarkdown } from "../utils/markdownUtils";
import { initialStructure } from "../constants/structure";

export interface FolderStructure {
  [key: string]: FolderStructure | string[] | undefined;
  files?: string[];
}

export const useProjectStructure = () => {
  const [structure, setStructure] = useState<unknown>(() =>
    storageService.load(initialStructure)
  );
  const [storageError, setStorageError] = useState<boolean>(
    !storageService.isAvailable()
  );
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleUpdate = useCallback(async (newStructure: unknown) => {
    setStructure(newStructure);
    try {
      await storageService.save(newStructure);
    } catch (error) {
      setStorageError(true);
      console.error("Failed to save structure:", error);
    }
  }, []);

  const handleReset = async () => {
    setIsResetting(true);
    setResetSuccess(false);

    try {
      await storageService.save(initialStructure);
      setStructure(initialStructure);
      setStorageError(false);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2000);
    } catch (error) {
      setStorageError(true);
      console.error("Failed to reset structure:", error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const timestamp = new Date().toISOString().split("T")[0];
      const markdown = `# Project Structure (${timestamp})\n\n${convertToMarkdown(
        structure as FolderStructure
      )}`;

      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `project-structure-${timestamp}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download structure:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const savedStructure = storageService.load(initialStructure);
    setStructure(savedStructure);
  }, []);

  return {
    structure,
    storageError,
    isResetting,
    resetSuccess,
    isDownloading,
    handleUpdate,
    handleReset,
    handleDownload,
  };
};
