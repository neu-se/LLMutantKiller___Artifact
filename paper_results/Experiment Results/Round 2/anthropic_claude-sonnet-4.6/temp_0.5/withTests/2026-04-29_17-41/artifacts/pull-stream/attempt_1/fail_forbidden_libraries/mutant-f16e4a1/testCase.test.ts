import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial value on empty stream', () => {
  it('should call callback with null error when stream ends immediately with no data', (done) => {
    // Create an empty source that ends immediately
    const emptySource = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined);
    };

    // Call reduce with only 2 args (no initial accumulator)
    const sink = reduce(
      (acc: any, data: any) => data,
      (err: any, val: any) => {
        // Original: cb(null) when end === true, so err should be null
        // Mutated: cb(end) when end === true, so err would be true (not null)
        expect(err).toBeNull();
        done();
      }
    );

    sink(emptySource);
  });
});