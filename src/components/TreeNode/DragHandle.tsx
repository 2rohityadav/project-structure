import { FC } from "react";
import { GripVertical } from "lucide-react";

export const DragHandle: FC = () => (
  <div className='flex items-center cursor-move mr-1 opacity-0 group-hover:opacity-40 hover:opacity-100'>
    <GripVertical
      size={16}
      className='text-gray-400'
    />
  </div>
);
