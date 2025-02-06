import { FC, FormEvent, ChangeEvent } from "react";

interface TreeNodeFormProps {
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  buttonText?: string;
}

export const TreeNodeForm: FC<TreeNodeFormProps> = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  buttonText = "Save",
}) => (
  <form
    onSubmit={onSubmit}
    className='flex items-center flex-1'
  >
    <input
      type='text'
      value={value}
      onChange={onChange}
      className='border rounded px-2 py-1 text-sm flex-1'
      autoFocus
    />
    <button
      type='submit'
      className='ml-2 text-green-600 hover:text-green-700'
    >
      {buttonText}
    </button>
    {onCancel && (
      <button
        type='button'
        onClick={onCancel}
        className='ml-2 text-gray-600 hover:text-gray-700'
      >
        Cancel
      </button>
    )}
  </form>
);
