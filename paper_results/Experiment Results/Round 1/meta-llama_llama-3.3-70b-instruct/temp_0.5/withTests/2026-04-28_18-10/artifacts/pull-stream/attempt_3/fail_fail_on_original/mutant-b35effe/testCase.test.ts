import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = jest.fn((data: any) => data === 7);
    const cb = jest.fn((err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(7);
    });

    find(test, cb)(null, (end: any, data: any) => {
      if (end) return cb(end, null);
      if (data === 7) return false;
      cb(null, data);
    })(null, (end: any, data: any) => {
      if (end) return cb(end, null);
      if (data === 7) return false;
      cb(null, data);
    });
    expect(test).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});