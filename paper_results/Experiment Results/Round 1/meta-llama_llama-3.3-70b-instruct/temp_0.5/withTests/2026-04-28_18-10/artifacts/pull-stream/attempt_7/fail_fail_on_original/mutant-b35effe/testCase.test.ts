import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';
import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find';
import { collect } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn((err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(7);
    });

    const read = values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    read(null, (end: any, data: any) => {
      if (end) return cb(end, null);
      if (data === 7) return find(test, cb)(null, (end: any, data: any) => {
        if (end) return cb(end, null);
        if (data === 7) return false;
        cb(null, data);
      });
      read(null, (end: any, data: any) => {
        if (end) return cb(end, null);
        if (data === 7) return find(test, cb)(null, (end: any, data: any) => {
          if (end) return cb(end, null);
          if (data === 7) return false;
          cb(null, data);
        });
      });
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });
});