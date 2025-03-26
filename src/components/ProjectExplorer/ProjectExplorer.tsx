import { FC, useState } from "react";
import { useProjectStructure } from "../../hooks/useProjectStructure";
import { ExplorerHeader } from "./ExplorerHeader";
import { TreeNode } from "../TreeNode/_index";
import { ResponsiveWarning } from "../ResponsiveWarning/_index";
import { Plus } from "lucide-react";
import { TreeNodeContent } from "../../models/FolderStructure";
import { initialStructure } from "../../constants/structure";
import { storageService } from "../../services/StorageService";
import { RootDropZone } from "./RootDropZone";

type ItemType = "folder" | "file";

export const ProjectExplorer: FC = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemType, setNewItemType] = useState<ItemType>("folder");
  
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

  const handleAddRootItem = () => {
    if (!newItemName.trim()) return;

    const updatedStructure = { ...storageService.load(initialStructure) };

    if (newItemType === "folder") {
      updatedStructure[newItemName] = {};
    } else {
      updatedStructure[newItemName] = null;
    }

    handleUpdate(updatedStructure);
    setNewItemName("");
    setShowAddForm(false);
  };

  const filteredEntries = Object.entries(structure as TreeNodeContent)
    .filter(([key]) => !key.startsWith('__'));
  
  const folders = filteredEntries.filter(([_, content]) => content !== null && typeof content === 'object');
  const files = filteredEntries.filter(([_, content]) => content === null);
  
  const sortedFolders = folders.sort(([a], [b]) => a.localeCompare(b));
  const sortedFiles = files.sort(([a], [b]) => a.localeCompare(b));
  
  const sortedEntries = [...sortedFolders, ...sortedFiles];

  return (
    <>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto'>
        <ExplorerHeader
          storageError={storageError}
          isDownloading={isDownloading}
          isResetting={isResetting}
          resetSuccess={resetSuccess}
          onDownload={handleDownload}
          onReset={handleReset}
        />
        
        <div className='p-4'>
          <div className='flex items-center justify-between mb-3 px-2'>
            <h3 className='text-sm font-medium text-gray-700'>Project Files</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className='p-1.5 hover:bg-gray-200 rounded flex items-center text-sm text-green-600'
            >
              <Plus size={16} className='mr-1' />
              Add Root Item
            </button>
          </div>
          
          {showAddForm && (
            <div className='mb-4 p-3 bg-gray-50 rounded border border-gray-200'>
              <form onSubmit={(e) => { e.preventDefault(); handleAddRootItem(); }} className='flex items-center space-x-2'>
                <input
                  type='text'
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder='Item name'
                  className='border rounded px-2 py-1 text-sm flex-1'
                  autoFocus
                />
                <select
                  value={newItemType}
                  onChange={(e) => setNewItemType(e.target.value as ItemType)}
                  className='border rounded px-2 py-1 text-sm bg-white'
                >
                  <option value='folder'>Folder</option>
                  <option value='file'>File</option>
                </select>
                <button
                  type='submit'
                  className='px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700'
                >
                  Add
                </button>
                <button
                  type='button'
                  onClick={() => setShowAddForm(false)}
                  className='px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300'
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Root Drop Zone for drag-and-drop to root level */}
          <RootDropZone onUpdate={handleUpdate} />
          
          {/* Render sorted items (folders first, then files) */}
          {sortedEntries.map(
            ([name, content]) => (
              <TreeNode
                key={name}
                name={name}
                content={content as TreeNodeContent}
                path={name}
                onUpdate={handleUpdate}
              />
            )
          )}
        </div>
      </div>
      {showWarning && (
        <ResponsiveWarning onClose={() => setShowWarning(false)} />
      )}
    </>
  );
};