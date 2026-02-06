import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState, useCallback } from 'react';

import Cell from 'components/Cell';
import LabelCell from 'components/LabelCell';
import { useKeyboardNavigation } from 'hooks/useKeyboardNavigation';
import { Position, Direction, computeNextPosition } from 'utils/navigationUtils';
import { getColumnLabel } from 'utils/spreadsheetUtils';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  const [editingCell, setEditingCell] = useState<Position | null>(null);

  const handleStartEditingSelected = useCallback(() => {
    if (selectedCell) {
      setEditingCell(selectedCell);
    }
  }, [selectedCell]);

  useKeyboardNavigation({
    bounds: { rows: NUM_ROWS, cols: NUM_COLUMNS },
    selectedCell,
    isEditing: editingCell !== null,
    onSelectionChange: setSelectedCell,
    onStartEditing: handleStartEditingSelected,
  });

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditingCell({ row, col });
  }, []);

  const handleEditStart = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditingCell({ row, col });
  }, []);

  const handleEditEnd = useCallback(
    (row: number, col: number, result: { saved: boolean; value: string }) => {
      if (result.saved) {
        setSpreadsheetState((prev) => {
          const newRow = [
            ...prev[row].slice(0, col),
            result.value,
            ...prev[row].slice(col + 1),
          ];
          return [...prev.slice(0, row), newRow, ...prev.slice(row + 1)];
        });
      }
      setEditingCell(null);
    },
    [],
  );

  const handleNavigate = useCallback((row: number, col: number, direction: Direction) => {
    const current = { row, col };
    const bounds = { rows: NUM_ROWS, cols: NUM_COLUMNS };
    const next = computeNextPosition(current, direction, bounds);
    setSelectedCell(next);
  }, []);

  return (
    <Box width="full">
      {/* Header row with column labels */}
      <Flex>
        <LabelCell label="" /> {/* Empty corner cell */}
        {_.times(NUM_COLUMNS, (colIdx) => (
          <LabelCell key={`col-${colIdx}`} label={getColumnLabel(colIdx)} />
        ))}
      </Flex>
      {/* Data rows with row labels */}
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            <LabelCell label={String(rowIdx + 1)} /> {/* Row number label */}
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                value={cellValue}
                isSelected={selectedCell?.row === rowIdx && selectedCell?.col === columnIdx}
                isEditing={editingCell?.row === rowIdx && editingCell?.col === columnIdx}
                onClick={() => handleCellClick(rowIdx, columnIdx)}
                onEditStart={() => handleEditStart(rowIdx, columnIdx)}
                onEditEnd={(result) => handleEditEnd(rowIdx, columnIdx, result)}
                onNavigate={(direction) => handleNavigate(rowIdx, columnIdx, direction)}
              />
            ))}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
