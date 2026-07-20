import { find } from '../../../sinks/find';

describe('find function', () => {
  it('should return the first matching element', () => {
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    const data = [1, 2, 3, 4, 5];
    const read = (end: boolean, cb: (end: boolean, data: number | null) => void) => {
      if (end) return cb(end);
      cb(null, data.shift());
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 3);
  });
});