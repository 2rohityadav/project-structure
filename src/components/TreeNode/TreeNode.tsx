import { FolderOpen, File } from "lucide-react";
import {
  FC,
  useState,
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
} from "react";
import { AddItemForm } from "./AddItemForm";
import { DragHandle } from "./DragHandle";
import { ExpandButton } from "./ExpandButton";
import { TreeNodeActions } from "./TreeNodeActions";
import { TreeNodeForm } from "./TreeNodeForm";
import { initialStructure } from "../../constants/structure";
import { storageService } from "../../services/StorageService";
import { moveItem } from "../../utils/treeUtils";
import { useTree } from "../../hooks/useTree";
import { TreeNodeContent } from "../../models/FolderStructure";
interface TreeNodeProps {
  name: string;
  content: TreeNodeContent | null;
  path: string;
  onUpdate: (data: TreeNodeContent) => void;
  level?: number;
}

type ItemType = "folder" | "file";

export const TreeNode: FC<TreeNodeProps> = ({
  name,
  content,
  path,
  onUpdate,
  level = 0,
}) => {
  const { globalExpanded } = useTree();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemType, setNewItemType] = useState<ItemType>("folder");
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const safeContent = content || {};
  const isFolder = content !== null && typeof content === "object";
  const files = isFolder && safeContent.files ? safeContent.files : [];
  const folders = isFolder
    ? Object.entries(safeContent).filter(([key]) => key !== "files")
    : [];
  const hasChildren = isFolder && (folders.length > 0 || files.length > 0);

  useEffect(() => {
    setIsExpanded(globalExpanded);
  }, [globalExpanded]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", path);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!isFolder) return;
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
    if (sourcePath === path) return;

    const updatedStructure = { ...storageService.load(initialStructure) };
    const newStructure = moveItem(updatedStructure, sourcePath, path);
    onUpdate(newStructure);
  };

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleDelete = async () => {
    const parentPath = path.split("/").slice(0, -1).join("/");
    const updatedStructure = { ...storageService.load(initialStructure) };
    let current: TreeNodeContent = updatedStructure;

    if (parentPath) {
      for (const segment of parentPath.split("/")) {
        if (
          segment &&
          current[segment] &&
          typeof current[segment] === "object"
        ) {
          current = current[segment] as TreeNodeContent;
        }
      }
    }

    if (current && name in current) {
      delete current[name];
      onUpdate(updatedStructure);
    }
  };

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const updatedStructure = { ...storageService.load(initialStructure) };
    let current: TreeNodeContent = updatedStructure;

    for (const segment of path.split("/")) {
      if (segment && current[segment] && typeof current[segment] === "object") {
        current = current[segment] as TreeNodeContent;
      }
    }

    if (newItemType === "folder") {
      current[newItemName] = {};
    } else {
      if (!current.files) {
        current.files = [];
      }
      current.files.push(newItemName);
    }

    onUpdate(updatedStructure);
    setNewItemName("");
    setShowAddForm(false);
  };

  const handleRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName.trim() || newName === name) {
      setIsEditing(false);
      return;
    }

    const parentPath = path.split("/").slice(0, -1).join("/");
    const updatedStructure = { ...storageService.load(initialStructure) };
    let current: TreeNodeContent = updatedStructure;

    if (parentPath) {
      for (const segment of parentPath.split("/")) {
        if (
          segment &&
          current[segment] &&
          typeof current[segment] === "object"
        ) {
          current = current[segment] as TreeNodeContent;
        }
      }
    }

    if (current && name in current) {
      current[newName] = current[name];
      delete current[name];
      onUpdate(updatedStructure);
    }
    setIsEditing(false);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);
  const handleItemNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemName(e.target.value);
  const handleItemTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setNewItemType(e.target.value as ItemType);

  return (
    <div className='ml-6'>
      <div
        className={`flex items-center group hover:bg-gray-50 rounded-lg px-2 py-1.5 -ml-2
          ${isDragOver ? "bg-blue-50 border-2 border-blue-200" : ""}`}
        draggable={true}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <DragHandle />
        {isFolder && (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={handleToggle}
          />
        )}
        {isFolder ? (
          <FolderOpen
            size={18}
            className='text-yellow-600 mr-2'
          />
        ) : (
          <File
            size={18}
            className='text-blue-600 mr-2'
          />
        )}

        {isEditing ? (
          <TreeNodeForm
            value={newName}
            onChange={handleNameChange}
            onSubmit={handleRename}
          />
        ) : (
          <>
            <span className='text-sm text-gray-700 truncate'>{name}</span>
            {isFolder && (
              <TreeNodeActions
                onAdd={() => setShowAddForm(true)}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </div>

      {showAddForm && (
        <AddItemForm
          itemName={newItemName}
          itemType={newItemType}
          onItemNameChange={handleItemNameChange}
          onItemTypeChange={handleItemTypeChange}
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {isExpanded && hasChildren && (
        <div>
          {folders.map(([childName, childContent]) => (
            <TreeNode
              key={childName}
              name={childName}
              content={childContent as TreeNodeContent}
              path={`${path}/${childName}`}
              onUpdate={onUpdate}
              level={level + 1}
            />
          ))}
          {files.map((fileName) => (
            <TreeNode
              key={fileName}
              name={fileName}
              content={null}
              path={`${path}/${fileName}`}
              onUpdate={onUpdate}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
