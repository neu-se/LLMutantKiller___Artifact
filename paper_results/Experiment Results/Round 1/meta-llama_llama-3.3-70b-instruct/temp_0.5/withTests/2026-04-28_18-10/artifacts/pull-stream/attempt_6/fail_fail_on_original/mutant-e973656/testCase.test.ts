import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;
    const read = (end: any, cb: (end: any, data: any) => void) => {
      if (i >= values.length) return cb(true, undefined);
      const value = values[i++];
      return cb(null, value);
    };
    const done = jest.fn();
    const op = (data: any) => {
      if (data === 3) return false;
      return true;
    };
    const sink = pull.drain(op, done);
    sink(read);
    sink(read);
    sink(read);
    sink(read);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});