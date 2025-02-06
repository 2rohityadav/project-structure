interface FolderStructure {
  [key: string]: FolderStructure | string[] | undefined;
  files?: string[];
}

export function convertToMarkdown(struct: FolderStructure, level = 0): string {
  let markdown = "";
  const indent = "  ".repeat(level);

  Object.entries(struct).forEach(([key, value]) => {
    if (key !== "files") {
      markdown += `${indent}- 📁 ${key}/\n`;
      if (typeof value === "object" && value !== null) {
        markdown += convertToMarkdown(value as FolderStructure, level + 1);
      }
    }
  });

  if (struct.files && struct.files.length > 0) {
    struct.files.forEach((file) => {
      markdown += `${indent}- 📄 ${file}\n`;
    });
  }

  return markdown;
}
