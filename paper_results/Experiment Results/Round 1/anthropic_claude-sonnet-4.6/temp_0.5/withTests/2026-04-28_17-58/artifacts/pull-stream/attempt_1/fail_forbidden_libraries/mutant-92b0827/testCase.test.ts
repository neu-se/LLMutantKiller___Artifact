import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce with 2 arguments when source ends immediately with an error', () => {
  it('should pass the error to the callback when source immediately ends with an error', (done) => {
    const expectedError = new Error('source error');
    
    // Create a source that immediately ends with an error
    const errorSource = function(end: any, cb: Function) {
      cb(expectedError);
    };
    
    // Call reduce with only 2 arguments (reducer and callback) - no initial accumulator
    const sink = reduce(
      function(acc: any, data: any) { return acc + data; },
      function(err: any, val: any) {
        // In the original code, err should be the expectedError
        // In the mutated code, err would be null (error swallowed)
        expect(err).toBe(expectedError);
        expect(val).toBeUndefined();
        done();
      }
    );
    
    // sink should be a function that accepts a source (since 2 args were passed)
    sink(errorSource);
  });
});