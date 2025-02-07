import { FC } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTree } from "../../hooks/useTree";

export const ExpandCollapseButton: FC = () => {
  const { globalExpanded, toggleGlobalExpanded } = useTree();

  return (
    <button
      onClick={toggleGlobalExpanded}
      className='p-1 hover:bg-gray-100 rounded-md flex items-center gap-1 text-sm text-gray-600'
    >
      {globalExpanded ? (
        <>
          <ChevronUp size={16} />
          Fold All
        </>
      ) : (
        <>
          <ChevronDown size={16} />
          Unfold All
        </>
      )}
    </button>
  );
};
