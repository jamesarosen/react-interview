export interface Position {
  row: number;
  col: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Bounds {
  rows: number;
  cols: number;
}

export const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const DIRECTION_DELTAS: Record<Direction, { row: number; col: number }> = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
};

/**
 * Computes the next cell position given current position and direction.
 * Returns the same position if movement would go out of bounds.
 */
export function computeNextPosition(
  current: Position,
  direction: Direction,
  bounds: Bounds,
): Position {
  const delta = DIRECTION_DELTAS[direction];
  const nextRow = current.row + delta.row;
  const nextCol = current.col + delta.col;

  if (nextRow < 0 || nextRow >= bounds.rows) {
    return current;
  }
  if (nextCol < 0 || nextCol >= bounds.cols) {
    return current;
  }

  return { row: nextRow, col: nextCol };
}
