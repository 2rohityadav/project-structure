import { FC } from "react";
import { AlertTriangle, Loader2, Download, Check } from "lucide-react";
import { ExpandCollapseButton } from "./ExpandCollapseButton";

interface ExplorerHeaderProps {
  storageError?: boolean;
  isDownloading?: boolean;
  isResetting?: boolean;
  resetSuccess?: boolean;
  onDownload: () => void;
  onReset: () => void;
}

export const ExplorerHeader: FC<ExplorerHeaderProps> = ({
  storageError,
  isDownloading,
  isResetting,
  resetSuccess,
  onDownload,
  onReset,
}) => (
  <div className='px-4 py-3 border-b border-gray-200 bg-[aliceblue]'>
    <div className='flex justify-between items-center'>
      <h2 className='text-lg font-semibold text-gray-800'>
        Project Structure Explorer
      </h2>
      <ExpandCollapseButton />
      <div className='flex items-center gap-2'>
        {storageError && (
          <div className='flex items-center text-sm text-amber-600'>
            <AlertTriangle
              size={16}
              className='mr-1'
            />
            Storage unavailable
          </div>
        )}
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className='px-3 py-1 text-sm border rounded flex items-center gap-2 min-w-[120px] justify-center cursor-pointer
            text-blue-600 hover:text-blue-700 hover:bg-blue-50'
        >
          {isDownloading ? (
            <>
              <Loader2
                size={14}
                className='animate-spin'
              />
              Downloading...
            </>
          ) : (
            <>
              <Download size={14} />
              Download MD
            </>
          )}
        </button>
        <button
          onClick={onReset}
          disabled={isResetting}
          className={`px-3 py-1 text-sm border rounded flex items-center gap-2 min-w-[120px] justify-center cursor-pointer
            ${
              isResetting || resetSuccess
                ? "bg-gray-100 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
        >
          {isResetting ? (
            <>
              <Loader2
                size={14}
                className='animate-spin'
              />
              Resetting...
            </>
          ) : resetSuccess ? (
            <>
              <Check
                size={14}
                className='text-green-600'
              />
              Reset Complete
            </>
          ) : (
            "Reset to Default"
          )}
        </button>
      </div>
    </div>
  </div>
);
