import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial value on empty stream', () => {
  it('should call callback with null error when stream ends immediately with no data', (done) => {
    // Create an empty source that ends immediately
    const emptySource = (end: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined);
    };

    const reducer = (acc: number, data: number) => acc + data;

    const sink = reduce(reducer, (err: any, val: any) => {
      // Original: cb(null) when end === true
      // Mutated: cb(true) when end === true
      expect(err).toBeNull();
      done();
    });

    // Call with 2 arguments triggers the special path
    sink(emptySource);
  });
});