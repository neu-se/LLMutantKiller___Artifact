import { describe, it, expect } from '@jest/globals';
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial value - error handling', () => {
  it('should pass actual error to callback when source ends with error immediately', (done) => {
    const expectedError = new Error('source error');
    
    // Create a source that immediately ends with an error
    const errorSource = function(end: any, cb: Function) {
      cb(expectedError);
    };
    
    const sink = reduce(
      function(acc: any, data: any) { return acc + data; },
      function(err: any, val: any) {
        // Original: err should be the actual error object
        // Mutated: err will be null (error is swallowed)
        expect(err).toBe(expectedError);
        expect(val).toBeUndefined();
        done();
      }
    );
    
    // sink is a function that takes a source when called with 2 args
    const through = sink as Function;
    through(errorSource);
  });
});