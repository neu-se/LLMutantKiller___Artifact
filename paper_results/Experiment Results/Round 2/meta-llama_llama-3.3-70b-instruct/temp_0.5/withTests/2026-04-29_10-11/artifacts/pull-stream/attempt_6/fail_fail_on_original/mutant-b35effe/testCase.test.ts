import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find function', () => {
  it('should return null when no element matches', () => {
    const test = (d: number) => d === 6;
    const cb = jest.fn();
    const data = [1, 2, 3, 4, 5];
    const read = (end: boolean, cb: (end: boolean | Error, data: number | null) => void) => {
      if (end) return cb(true, null);
      cb(null, data.shift());
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, null);
  });
});