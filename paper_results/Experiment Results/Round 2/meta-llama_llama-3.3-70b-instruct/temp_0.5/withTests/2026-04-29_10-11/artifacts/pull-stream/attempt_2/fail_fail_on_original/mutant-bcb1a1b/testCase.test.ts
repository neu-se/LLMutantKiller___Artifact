import { reduce } from '../../../sinks/reduce.js';

describe('reduce function', () => {
  it('should return a function that calls the callback with the accumulated value when the source stream ends', () => {
    let called = false;
    const source = (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const reducer = (acc: any, current: any) => acc + current;
    const cb = (err: any, result: any) => {
      called = true;
      expect(err).toBeNull();
      expect(result).toBe(3);
    };

    const sink = reduce(reducer, 0, cb);
    expect(typeof sink).toBe('function');
    sink(source);
    expect(called).toBe(true);
  });

  it('should return the sink function when the callback is not provided', () => {
    const source = (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const reducer = (acc: any, current: any) => acc + current;
    const sink = reduce(reducer, 0);
    expect(typeof sink).toBe('function');
  });
});