import { useCallback, useEffect } from 'react';
import { Position, Bounds, KEY_TO_DIRECTION, computeNextPosition } from 'utils/navigationUtils';

interface UseKeyboardNavigationOptions {
  bounds: Bounds;
  selectedCell: Position | null;
  isEditing: boolean;
  onSelectionChange: (position: Position) => void;
  onStartEditing: () => void;
}

export function useKeyboardNavigation({
  bounds,
  selectedCell,
  isEditing,
  onSelectionChange,
  onStartEditing,
}: UseKeyboardNavigationOptions): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isEditing) {
        return;
      }

      // Enter starts editing the selected cell
      if (event.key === 'Enter' && selectedCell) {
        event.preventDefault();
        onStartEditing();
        return;
      }

      let direction = KEY_TO_DIRECTION[event.key];

      // Tab = right, Shift+Tab = left
      if (event.key === 'Tab') {
        direction = event.shiftKey ? 'left' : 'right';
      }

      if (!direction) {
        return;
      }

      event.preventDefault();

      if (!selectedCell) {
        onSelectionChange({ row: 0, col: 0 });
        return;
      }

      const nextPosition = computeNextPosition(selectedCell, direction, bounds);
      onSelectionChange(nextPosition);
    },
    [bounds, selectedCell, isEditing, onSelectionChange, onStartEditing],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
