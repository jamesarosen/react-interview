import { describe, it, expect } from 'vitest';
import { computeNextPosition, Position, Bounds } from './navigationUtils';

describe('computeNextPosition', () => {
  const bounds3x3: Bounds = { rows: 3, cols: 3 };

  describe('basic movement from center', () => {
    const center: Position = { row: 1, col: 1 };

    it('moves up', () => {
      expect(computeNextPosition(center, 'up', bounds3x3)).toEqual({ row: 0, col: 1 });
    });

    it('moves down', () => {
      expect(computeNextPosition(center, 'down', bounds3x3)).toEqual({ row: 2, col: 1 });
    });

    it('moves left', () => {
      expect(computeNextPosition(center, 'left', bounds3x3)).toEqual({ row: 1, col: 0 });
    });

    it('moves right', () => {
      expect(computeNextPosition(center, 'right', bounds3x3)).toEqual({ row: 1, col: 2 });
    });
  });

  describe('boundary blocking', () => {
    it('blocks at top edge', () => {
      const top: Position = { row: 0, col: 1 };
      expect(computeNextPosition(top, 'up', bounds3x3)).toEqual(top);
    });

    it('blocks at bottom edge', () => {
      const bottom: Position = { row: 2, col: 1 };
      expect(computeNextPosition(bottom, 'down', bounds3x3)).toEqual(bottom);
    });

    it('blocks at left edge', () => {
      const left: Position = { row: 1, col: 0 };
      expect(computeNextPosition(left, 'left', bounds3x3)).toEqual(left);
    });

    it('blocks at right edge', () => {
      const right: Position = { row: 1, col: 2 };
      expect(computeNextPosition(right, 'right', bounds3x3)).toEqual(right);
    });
  });

  describe('corner cases', () => {
    it('handles top-left corner (0,0)', () => {
      const topLeft: Position = { row: 0, col: 0 };
      expect(computeNextPosition(topLeft, 'up', bounds3x3)).toEqual(topLeft);
      expect(computeNextPosition(topLeft, 'left', bounds3x3)).toEqual(topLeft);
      expect(computeNextPosition(topLeft, 'down', bounds3x3)).toEqual({ row: 1, col: 0 });
      expect(computeNextPosition(topLeft, 'right', bounds3x3)).toEqual({ row: 0, col: 1 });
    });

    it('handles bottom-right corner', () => {
      const bottomRight: Position = { row: 2, col: 2 };
      expect(computeNextPosition(bottomRight, 'down', bounds3x3)).toEqual(bottomRight);
      expect(computeNextPosition(bottomRight, 'right', bounds3x3)).toEqual(bottomRight);
      expect(computeNextPosition(bottomRight, 'up', bounds3x3)).toEqual({ row: 1, col: 2 });
      expect(computeNextPosition(bottomRight, 'left', bounds3x3)).toEqual({ row: 2, col: 1 });
    });
  });

  describe('single row/column grids', () => {
    it('handles single-column grid', () => {
      const singleCol: Bounds = { rows: 3, cols: 1 };
      const pos: Position = { row: 1, col: 0 };
      expect(computeNextPosition(pos, 'left', singleCol)).toEqual(pos);
      expect(computeNextPosition(pos, 'right', singleCol)).toEqual(pos);
      expect(computeNextPosition(pos, 'up', singleCol)).toEqual({ row: 0, col: 0 });
      expect(computeNextPosition(pos, 'down', singleCol)).toEqual({ row: 2, col: 0 });
    });

    it('handles single-row grid', () => {
      const singleRow: Bounds = { rows: 1, cols: 3 };
      const pos: Position = { row: 0, col: 1 };
      expect(computeNextPosition(pos, 'up', singleRow)).toEqual(pos);
      expect(computeNextPosition(pos, 'down', singleRow)).toEqual(pos);
      expect(computeNextPosition(pos, 'left', singleRow)).toEqual({ row: 0, col: 0 });
      expect(computeNextPosition(pos, 'right', singleRow)).toEqual({ row: 0, col: 2 });
    });

    it('handles 1x1 grid (no movement possible)', () => {
      const oneByOne: Bounds = { rows: 1, cols: 1 };
      const pos: Position = { row: 0, col: 0 };
      expect(computeNextPosition(pos, 'up', oneByOne)).toEqual(pos);
      expect(computeNextPosition(pos, 'down', oneByOne)).toEqual(pos);
      expect(computeNextPosition(pos, 'left', oneByOne)).toEqual(pos);
      expect(computeNextPosition(pos, 'right', oneByOne)).toEqual(pos);
    });
  });

  describe('larger grids (10x10)', () => {
    const bounds10x10: Bounds = { rows: 10, cols: 10 };

    it('navigates freely in the middle', () => {
      const middle: Position = { row: 5, col: 5 };
      expect(computeNextPosition(middle, 'up', bounds10x10)).toEqual({ row: 4, col: 5 });
      expect(computeNextPosition(middle, 'down', bounds10x10)).toEqual({ row: 6, col: 5 });
      expect(computeNextPosition(middle, 'left', bounds10x10)).toEqual({ row: 5, col: 4 });
      expect(computeNextPosition(middle, 'right', bounds10x10)).toEqual({ row: 5, col: 6 });
    });
  });
});
