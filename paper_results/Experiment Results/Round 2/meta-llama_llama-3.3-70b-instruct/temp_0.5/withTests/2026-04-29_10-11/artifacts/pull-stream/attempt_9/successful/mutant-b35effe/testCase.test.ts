import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find function', () => {
  it('should handle error when err is not true', () => {
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    const err = new Error('test error');
    const read = (end: boolean, cb: (end: boolean | Error, data: number | null) => void) => {
      if (end) return cb(end);
      cb(err, null);
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(err === true ? null : err, null);
  });
});