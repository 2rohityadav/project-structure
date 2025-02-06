interface FolderStructure {
  [key: string]: FolderStructure | string[] | undefined;
  files?: string[];
}

export function getPathParts(fullPath: string) {
  const parts = fullPath.split("/");
  const itemName = parts.pop() || "";
  const parentPath = parts.join("/");
  return { parentPath, itemName };
}

export function getItemAtPath(
  structure: FolderStructure,
  itemPath: string
): FolderStructure | null {
  const parts = itemPath.split("/");
  let current: FolderStructure | undefined = structure;

  for (const part of parts) {
    if (
      !current ||
      (!current[part] && (!current.files || !current.files.includes(part)))
    ) {
      return null;
    }
    if (current.files && current.files.includes(part)) {
      return null;
    }
    current = current[part] as FolderStructure;
  }

  return current || null;
}

export function moveItem(
  structure: FolderStructure,
  sourcePath: string,
  targetPath: string
): FolderStructure {
  const { parentPath: sourceParent, itemName: sourceItem } =
    getPathParts(sourcePath);
  const sourceDir = sourceParent
    ? getItemAtPath(structure, sourceParent)
    : structure;
  const targetDir = targetPath
    ? getItemAtPath(structure, targetPath)
    : structure;

  if (!sourceDir || !targetDir) return structure;

  if (sourceDir.files && sourceDir.files.includes(sourceItem)) {
    sourceDir.files = sourceDir.files.filter((f) => f !== sourceItem);
    if (!targetDir.files) targetDir.files = [];
    targetDir.files.push(sourceItem);
  } else if (sourceDir[sourceItem]) {
    const itemContent = sourceDir[sourceItem];
    delete sourceDir[sourceItem];
    targetDir[sourceItem] = itemContent;
  }

  return structure;
}
