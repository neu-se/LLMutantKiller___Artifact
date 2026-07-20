import { find } from '../../../sinks/find';

describe('find function', () => {
  it('should return the first matching element', () => {
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    const read = (end: boolean, cb: (end: boolean, data: number | null) => void) => {
      if (end) return cb(end);
      if (end === true) return cb(true);
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true);
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 3);
  });

  it('should handle error when err is not true', () => {
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    const read = (end: boolean, cb: (end: boolean, data: number | null) => void) => {
      if (end) return cb(end);
      if (end === true) return cb(true);
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true);
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 3);
  });

  it('should handle error when err is true', () => {
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    const read = (end: boolean, cb: (end: boolean, data: number | null) => void) => {
      if (end) return cb(end);
      if (end === true) return cb(true);
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true);
    };
    const drain = find(test, cb);
    drain(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 3);
  });
});