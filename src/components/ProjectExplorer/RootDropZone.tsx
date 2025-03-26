import { FC, useState, DragEvent } from "react";
import { TreeNodeContent } from "../../models/FolderStructure";
import { initialStructure } from "../../constants/structure";
import { storageService } from "../../services/StorageService";
import { getPathParts } from "../../utils/treeUtils";

interface RootDropZoneProps {
  onUpdate: (data: TreeNodeContent) => void;
}

export const RootDropZone: FC<RootDropZoneProps> = ({ onUpdate }) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const sourcePath = e.dataTransfer.getData("text/plain");
    if (!sourcePath) return;

    const structure = { ...storageService.load<TreeNodeContent>(initialStructure) };
    
    const { parentPath, itemName } = getPathParts(sourcePath);
    
    if (!parentPath) return;
    
    let sourceParent = structure;
    for (const segment of parentPath.split("/")) {
      if (segment && sourceParent[segment] && typeof sourceParent[segment] === "object") {
        sourceParent = sourceParent[segment] as TreeNodeContent;
      }
    }
    
    if (sourceParent.files && sourceParent.files.includes(itemName)) {
      sourceParent.files = sourceParent.files.filter(f => f !== itemName);
      
      structure[itemName] = null;
    }

    else if (sourceParent[itemName]) {
      const itemContent = sourceParent[itemName];
      
      delete sourceParent[itemName];
      
      structure[itemName] = itemContent;
    }
    
    onUpdate(structure);
  };

  return (
    <div 
      className={`px-3 py-2 rounded-md mt-2 mb-4 border-2 border-dashed transition-colors 
        ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-sm text-center text-gray-500">
        {isDragOver ? 'Drop here to move to root level' : 'Drag items here to move them to root level'}
      </p>
    </div>
  );
};