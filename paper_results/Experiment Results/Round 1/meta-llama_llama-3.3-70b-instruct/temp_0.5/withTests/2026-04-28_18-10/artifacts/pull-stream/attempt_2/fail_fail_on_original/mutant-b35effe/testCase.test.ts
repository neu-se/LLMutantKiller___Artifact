import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn();

    const read = find(test, cb);
    read(null, (end: any, data: any) => {
      if (end) return cb(null, null);
      if (data === 7) return false;
      read(null, (end: any, data: any) => {
        if (end) return cb(null, null);
        if (data === 7) return false;
        cb(new Error('not found'), null);
      });
    });
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 7);
  });
});