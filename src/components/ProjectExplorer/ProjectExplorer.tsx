import { FC } from "react";
import { useProjectStructure } from "../../hooks/useProjectStructure";
import { ExplorerHeader } from "./ExplorerHeader";
import { TreeNode } from "../TreeNode/_index";

interface TreeNodeContent {
  [key: string]: TreeNodeContent | string[] | undefined;
  files?: string[];
}

export const ProjectExplorer: FC = () => {
  const {
    structure,
    storageError,
    isResetting,
    resetSuccess,
    isDownloading,
    handleUpdate,
    handleReset,
    handleDownload,
  } = useProjectStructure();

  return (
    <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200'>
      <ExplorerHeader
        storageError={storageError}
        isDownloading={isDownloading}
        isResetting={isResetting}
        resetSuccess={resetSuccess}
        onDownload={handleDownload}
        onReset={handleReset}
      />
      <div className='p-4'>
        {Object.entries(structure as TreeNodeContent).map(([name, content]) => (
          <TreeNode
            key={name}
            name={name}
            content={content as TreeNodeContent}
            path={name}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};
