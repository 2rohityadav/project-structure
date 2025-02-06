import { FC } from "react";
import { Laptop, X } from "lucide-react";

interface ResponsiveWarningProps {
  onClose: () => void;
}

export const ResponsiveWarning: FC<ResponsiveWarningProps> = ({ onClose }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-amber-50 p-4 md:hidden'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Laptop
            className='text-amber-600'
            size={20}
          />
          <p className='text-sm text-amber-800'>
            For the best experience, please switch to desktop mode or use a
            laptop/desktop
          </p>
        </div>
        <button
          onClick={onClose}
          className='text-amber-600 hover:text-amber-800'
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
