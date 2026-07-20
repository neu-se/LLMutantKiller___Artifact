import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial accumulator value', () => {
  it('should use the first element as the initial accumulator when called with only 2 arguments', (done) => {
    // Create a simple source that emits values
    const values = [1, 2, 3, 4, 5];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const sink = reduce(
      (acc: number, data: number) => acc + data,
      (err: any, result: number) => {
        expect(err).toBeNull();
        // With no initial value, first element (1) is used as acc,
        // then 1+2+3+4+5 = 15
        expect(result).toBe(15);
        done();
      }
    );

    // When called with 2 args, reduce should return a through-stream (function accepting source)
    // not a drain directly
    const through = sink(source);
    // The through-stream should be a function that reads from source
    expect(typeof through).toBe('function');
  });
});