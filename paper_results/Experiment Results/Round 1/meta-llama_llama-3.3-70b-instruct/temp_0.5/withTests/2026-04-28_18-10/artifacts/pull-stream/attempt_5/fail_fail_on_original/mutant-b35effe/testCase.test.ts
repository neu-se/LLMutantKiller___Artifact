import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const test = (data: any) => data === 7;
    const cb = jest.fn((err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(7);
    });

    const source = (end: any, cb: any) => {
      let i = 0;
      return () => {
        if (end) return cb(end);
        if (i >= values.length) return cb(true);
        return cb(null, values[i++]);
      };
    };

    const read = find(test, cb);
    source(null, read);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});