import { useState, ChangeEvent } from "react";

interface UseTreeNodeReturn {
  isExpanded: boolean;
  isEditing: boolean;
  newName: string;
  showAddForm: boolean;
  newItemName: string;
  newItemType: string;
  handleToggle: () => void;
  setNewName: (value: string) => void;
  setIsEditing: (value: boolean) => void;
  handleNewItemNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNewItemTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleShowAddForm: () => void;
  handleHideAddForm: () => void;
  handleStartEditing: () => void;
}

export const useTreeNode = (name: string): UseTreeNodeReturn => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("folder");

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleNewItemNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemName(e.target.value);

  const handleNewItemTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setNewItemType(e.target.value);

  const handleShowAddForm = () => setShowAddForm(true);
  const handleHideAddForm = () => setShowAddForm(false);
  const handleStartEditing = () => setIsEditing(true);

  return {
    isExpanded,
    isEditing,
    newName,
    showAddForm,
    newItemName,
    newItemType,
    handleToggle,
    setNewName,
    setIsEditing,
    handleNewItemNameChange,
    handleNewItemTypeChange,
    handleShowAddForm,
    handleHideAddForm,
    handleStartEditing,
  };
};
