import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';

import Cell from 'components/Cell';
import LabelCell from 'components/LabelCell';
import { getColumnLabel } from 'utils/spreadsheetUtils';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

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
                onChange={(newValue: string) => {
                  const newRow = [
                    ...spreadsheetState[rowIdx].slice(0, columnIdx),
                    newValue,
                    ...spreadsheetState[rowIdx].slice(columnIdx + 1),
                  ];
                  setSpreadsheetState([
                    ...spreadsheetState.slice(0, rowIdx),
                    newRow,
                    ...spreadsheetState.slice(rowIdx + 1),
                  ]);
                }}
              />
            ))}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
