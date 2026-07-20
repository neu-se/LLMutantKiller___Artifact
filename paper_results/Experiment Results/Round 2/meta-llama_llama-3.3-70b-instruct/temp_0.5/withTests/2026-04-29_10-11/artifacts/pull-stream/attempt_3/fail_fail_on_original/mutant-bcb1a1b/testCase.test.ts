import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should return a function that calls the callback with the accumulated value when the source stream ends', () => {
    let called = false;
    const source = (end: boolean | null, cb: (end: boolean | null, value?: any) => void) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const reducer = (acc: number, current: number) => acc + current;
    const cb = (err: any, result: number) => {
      called = true;
      expect(err).toBeNull();
      expect(result).toBe(3);
    };

    const sink = reduce(reducer, 0, cb);
    expect(typeof sink).toBe('function');
    sink(source);
    expect(called).toBe(true);
  });

  it('should return the sink function when the callback is not provided and two arguments are passed', () => {
    const source = (end: boolean | null, cb: (end: boolean | null, value?: any) => void) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const reducer = (acc: number, current: number) => acc + current;
    const sink = reduce(reducer, 0);
    expect(typeof sink).toBe('function');
    sink(source);
  });

  it('should return the sink function when the callback is not provided and one argument is passed', () => {
    const source = (end: boolean | null, cb: (end: boolean | null, value?: any) => void) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const reducer = (acc: number, current: number) => acc + current;
    const sink = reduce(reducer, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(3);
    });
    expect(typeof sink).toBe('function');
    sink(source);
  });
});