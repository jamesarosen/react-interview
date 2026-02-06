import { Input, Box } from '@chakra-ui/react';
import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { formatCell } from 'utils/formatCell';

interface EditResult {
  saved: boolean;
  value: string;
}

interface Props {
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  onClick: () => void;
  onEditStart: () => void;
  onEditEnd: (result: EditResult) => void;
  onNavigate: (direction: 'left' | 'right') => void;
}

const Cell: React.FC<Props> = ({
  value,
  isSelected,
  isEditing,
  onClick,
  onEditStart,
  onEditEnd,
  onNavigate,
}) => {
  const [editValue, setEditValue] = useState(value);
  const formattedValue = useMemo(() => formatCell(value), [value]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handledByKeyboardRef = useRef(false);

  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
      handledByKeyboardRef.current = false;
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleFocus = useCallback(() => {
    onEditStart();
    setEditValue(value);
  }, [value, onEditStart]);

  const handleBlur = useCallback(() => {
    // Only handle blur from click-away; keyboard cases handled in handleKeyDown
    if (!handledByKeyboardRef.current) {
      onEditEnd({ saved: true, value: editValue });
    }
  }, [editValue, onEditEnd]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((ev) => {
    setEditValue(ev.target.value);
  }, []);

  const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>((ev) => {
    if (ev.key === 'Escape') {
      handledByKeyboardRef.current = true;
      onEditEnd({ saved: false, value });
      inputRef.current?.blur();
    } else if (ev.key === 'Enter') {
      handledByKeyboardRef.current = true;
      onEditEnd({ saved: true, value: editValue });
      inputRef.current?.blur();
    } else if (ev.key === 'Tab') {
      ev.preventDefault();
      ev.nativeEvent.stopImmediatePropagation(); // Prevent useKeyboardNavigation from also handling
      handledByKeyboardRef.current = true;
      onEditEnd({ saved: true, value: editValue });
      inputRef.current?.blur();
      onNavigate(ev.shiftKey ? 'left' : 'right');
    }
  }, [value, editValue, onEditEnd, onNavigate]);

  const displayValue = isEditing ? editValue : formattedValue;

  return (
    <Box
      width="100px"
      height="40px"
      borderWidth={isSelected ? '2px' : '1px'}
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      backgroundColor={isSelected ? 'blue.50' : 'white'}
      transition="border-color 0.1s, background-color 0.1s"
    >
      <Input
        ref={inputRef}
        value={displayValue}
        borderRadius={0}
        width="full"
        height="full"
        border="none"
        _focus={{ boxShadow: 'none' }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={onClick}
      />
    </Box>
  );
};

export default React.memo(Cell);
