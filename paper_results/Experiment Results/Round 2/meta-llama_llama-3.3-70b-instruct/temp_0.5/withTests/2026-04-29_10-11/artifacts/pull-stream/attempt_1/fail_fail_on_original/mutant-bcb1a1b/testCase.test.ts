import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should return a function that calls the callback with the accumulated value when the source stream ends', () => {
    let called = false;
    const source = (end, cb) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const reducer = (acc, current) => acc + current;
    const cb = (err, result) => {
      called = true;
      expect(err).toBeNull();
      expect(result).toBe(3);
    };

    const sink = reduce(reducer, 0, cb);
    sink(source);
    expect(called).toBe(true);
  });
});