import { count } from '../../../sources/count';
import { expect } from '@jest/globals';

describe('count function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const max = 5;
    const read = count(max);
    let i = 0;
    read(null, (end: any, data: any) => {
      if (end) return;
      i++;
      if (i === max) {
        read(null, (end: any, data: any) => {
          expect(end).toBe(true);
        });
      } else {
        read(null, (end: any, data: any) => {
          expect(end).toBe(null);
        });
      }
    });
  });
});