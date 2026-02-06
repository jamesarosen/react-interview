import { Input, Box } from '@chakra-ui/react';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { formatCell } from 'utils/formatCell';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const Cell: React.FC<Props> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const formattedValue = useMemo(() => formatCell(value), [value]);

  // Keep edit value in sync with prop value when not editing
  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
    }
  }, [value, isEditing]);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
    setEditValue(value);
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    onChange(editValue);
  }, [editValue, onChange]);

  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((ev) => {
    setEditValue(ev.target.value);
  }, []);

  const displayValue = isEditing ? editValue : formattedValue;

  return (
    <Box width="100px" height="40px">
      <Input
        value={displayValue}
        borderRadius={0}
        width="full"
        height="full"
        onChange={onChangeHandler}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export default Cell;
