import { ChangeEvent, FC, FormEvent } from "react";

interface AddItemFormProps {
  itemName: string;
  itemType: string;
  onItemNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onItemTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export const AddItemForm: FC<AddItemFormProps> = ({
  itemName,
  itemType,
  onItemNameChange,
  onItemTypeChange,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className='ml-8 mt-2 mb-2'
  >
    <div className='flex items-center space-x-2'>
      <input
        type='text'
        value={itemName}
        onChange={onItemNameChange}
        placeholder='Name'
        className='border rounded px-2 py-1 text-sm'
        autoFocus
      />
      <select
        value={itemType}
        onChange={onItemTypeChange}
        className='border rounded px-2 py-1 text-sm bg-white'
      >
        <option value='folder'>Folder</option>
        <option value='file'>File</option>
      </select>
      <button
        type='submit'
        className='px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700'
      >
        Add
      </button>
      <button
        type='button'
        onClick={onCancel}
        className='px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300'
      >
        Cancel
      </button>
    </div>
  </form>
);
