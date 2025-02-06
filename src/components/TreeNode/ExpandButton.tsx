import { ChevronDown, ChevronRight } from "lucide-react";
import { MouseEventHandler, FC } from "react";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ExpandButton: FC<ExpandButtonProps> = ({
  isExpanded,
  onClick,
}) => (
  <button
    onClick={onClick}
    className='p-0.5 hover:bg-gray-200 rounded mr-1'
  >
    {isExpanded ? (
      <ChevronDown
        size={18}
        className='text-gray-500'
      />
    ) : (
      <ChevronRight
        size={18}
        className='text-gray-500'
      />
    )}
  </button>
);
