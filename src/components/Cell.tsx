import { Input, Box } from '@chakra-ui/react';
import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { formatCell } from 'utils/formatCell';

interface Props {
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  onChange: (newValue: string) => void;
  onClick: () => void;
  onEditStart: () => void;
  onEditEnd: () => void;
}

const Cell: React.FC<Props> = ({
  value,
  isSelected,
  isEditing,
  onChange,
  onClick,
  onEditStart,
  onEditEnd,
}) => {
  const [editValue, setEditValue] = useState(value);
  const formattedValue = useMemo(() => formatCell(value), [value]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
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
    onEditEnd();
    onChange(editValue);
  }, [editValue, onChange, onEditEnd]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((ev) => {
    setEditValue(ev.target.value);
  }, []);

  const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>((ev) => {
    if (ev.key === 'Escape') {
      inputRef.current?.blur();
    }
  }, []);

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
