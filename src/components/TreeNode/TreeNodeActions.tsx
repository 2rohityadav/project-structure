import { Plus, Edit2, Trash2 } from "lucide-react";
import { FC } from "react";

interface TreeNodeActionsProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TreeNodeActions: FC<TreeNodeActionsProps> = ({
  onAdd,
  onEdit,
  onDelete,
}) => (
  <div className='flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto'>
    <button
      onClick={onAdd}
      className='p-1.5 hover:bg-gray-200 rounded'
    >
      <Plus
        size={16}
        className='text-green-600'
      />
    </button>
    <button
      onClick={onEdit}
      className='p-1.5 hover:bg-gray-200 rounded'
    >
      <Edit2
        size={16}
        className='text-blue-600'
      />
    </button>
    <button
      onClick={onDelete}
      className='p-1.5 hover:bg-gray-200 rounded'
    >
      <Trash2
        size={16}
        className='text-red-600'
      />
    </button>
  </div>
);
