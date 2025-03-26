import { TreeNodeContent } from "../models/FolderStructure";

export function getPathParts(fullPath: string) {
  const parts = fullPath.split("/");
  const itemName = parts.pop() || "";
  const parentPath = parts.join("/");
  return { parentPath, itemName };
}

export function getItemAtPath(
  structure: TreeNodeContent,
  itemPath: string
): TreeNodeContent | null {
  if (!itemPath) return structure;
  
  const parts = itemPath.split("/");
  let current: TreeNodeContent = structure;

  for (const part of parts) {
    if (!part) continue;
    
    if (!current[part] || typeof current[part] !== "object") {
      return null;
    }
    current = current[part] as TreeNodeContent;
  }

  return current;
}

export function moveItem(
  structure: TreeNodeContent,
  sourcePath: string,
  targetPath: string
): TreeNodeContent {

  const newStructure = { ...structure };
  
  const { parentPath: sourceParent, itemName: sourceItem } = getPathParts(sourcePath);
  
  const sourceDir = sourceParent
    ? getItemAtPath(newStructure, sourceParent)
    : newStructure;
    
  const targetDir = getItemAtPath(newStructure, targetPath);
  
  if (!sourceDir || !targetDir) return newStructure;

  if (sourceDir.files && sourceDir.files.includes(sourceItem)) {
    sourceDir.files = sourceDir.files.filter(f => f !== sourceItem);
    
    if (!targetDir.files) targetDir.files = [];
    if (!targetDir.files.includes(sourceItem)) {
      targetDir.files.push(sourceItem);
    }
  } 

  else if (sourceDir[sourceItem]) {
    const itemContent = sourceDir[sourceItem];
    delete sourceDir[sourceItem];
    targetDir[sourceItem] = itemContent;
  }

  return newStructure;
}