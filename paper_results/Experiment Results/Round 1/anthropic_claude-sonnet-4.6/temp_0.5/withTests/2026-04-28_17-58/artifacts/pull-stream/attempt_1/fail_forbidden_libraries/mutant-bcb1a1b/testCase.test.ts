import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial accumulator value', () => {
  it('should use the first element as the initial accumulator when called with 2 arguments', (done) => {
    // Create a simple pull-stream source from an array
    function values(array: number[]) {
      let i = 0;
      return function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) {
          i = array.length;
          cb(abort);
        } else if (i >= array.length) {
          cb(true);
        } else {
          cb(null, array[i++]);
        }
      };
    }

    // When called with 2 arguments (reducer + callback), reduce should use
    // the first element as the initial accumulator.
    // For [1, 2, 3]: first element (1) becomes acc, then reducer(1, 2) = 3, then reducer(3, 3) = 6
    const sink = reduce(
      function (a: number, b: number) { return a + b; },
      function (err: any, val: number) {
        expect(err).toBeNull();
        // With original code: first value (1) is used as initial acc, result = 1+2+3 = 6
        // With mutated code: acc starts as null, reducer(null, 1) = "null1" or NaN, result is wrong
        expect(val).toBe(6);
        done();
      }
    );

    sink(values([1, 2, 3]));
  });
});