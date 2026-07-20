import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find function', () => {
  it('should return the first matching element', () => {
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    const data = [1, 2, 3, 4, 5];
    const read = (end: boolean, cb: (end: boolean | Error, data: number | null) => void) => {
      if (end) return cb(true, null);
      if (data.length > 0) {
        cb(null, data.shift());
      } else {
        cb(true, null);
      }
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 3);
  });
});