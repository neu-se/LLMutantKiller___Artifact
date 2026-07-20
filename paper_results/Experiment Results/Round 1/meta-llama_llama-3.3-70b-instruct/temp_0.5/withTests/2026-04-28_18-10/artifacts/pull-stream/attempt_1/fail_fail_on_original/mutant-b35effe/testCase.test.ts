import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === 7;
    const cb = (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBe(7);
    };

    find(test, cb)(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) return false;
      return cb(null, data);
    })(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) return false;
      return cb(null, data);
    });
  });
});