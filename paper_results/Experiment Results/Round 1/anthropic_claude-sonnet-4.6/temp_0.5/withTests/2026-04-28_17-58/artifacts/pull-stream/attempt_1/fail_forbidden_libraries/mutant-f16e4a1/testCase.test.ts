import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial value on empty stream', () => {
  it('should call callback with null error when source ends immediately with no data', (done) => {
    // Create an empty source that ends immediately
    const emptySource = (end: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined);
    };

    // Call reduce with only 2 arguments (no initial accumulator)
    const sink = reduce(
      (acc: any, data: any) => data,
      (err: any, val: any) => {
        // In the original code: end === true => cb(null), so err should be null
        // In the mutated code: end === false ? null : end => cb(true), so err would be true
        expect(err).toBeNull();
        done();
      }
    );

    // sink should return a function (through) since arguments.length === 2
    const through = sink as (source: any) => void;
    through(emptySource);
  });
});