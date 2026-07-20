import { count } from '../../../sources/count';

describe('count function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const max = 5;
    const read = count(max);
    let i = 0;
    read(null, (end, data) => {
      if (end) return;
      i++;
      if (i === max) {
        read(null, (end, data) => {
          expect(end).toBe(true);
        });
      } else {
        read(null, (end, data) => {
          expect(end).toBe(null);
        });
      }
    });
  });
});