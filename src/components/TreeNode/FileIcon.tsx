import { File, FolderOpen } from "lucide-react";
import { FC } from "react";

interface FileIconProps {
  isFolder: boolean;
}

export const FileIcon: FC<FileIconProps> = ({ isFolder }) =>
  isFolder ? (
    <FolderOpen
      size={18}
      className='text-yellow-600 mr-2'
    />
  ) : (
    <File
      size={18}
      className='text-blue-600 mr-2'
    />
  );
