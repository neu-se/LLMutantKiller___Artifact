import { find } from '../../../sinks/find';
import { values } from '../../../sources/values';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const testFn = (data: any) => data === 7;
    const cb = (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBe(7);
    };

    const read = find(testFn, cb);
    values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(null, (end: any, data: any) => {
      if (end) return;
      read(end, data);
    });
  });
});