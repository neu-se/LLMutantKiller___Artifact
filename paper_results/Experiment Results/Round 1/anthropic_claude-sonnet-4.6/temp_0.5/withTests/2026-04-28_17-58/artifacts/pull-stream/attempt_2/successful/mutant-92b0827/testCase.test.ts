import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce - 2 argument form with immediate error from source', () => {
  it('should pass the error to the callback when source immediately ends with an error', (done) => {
    const expectedError = new Error('source error');

    // Source that immediately ends with an error (no data)
    const errorSource = function(_end: any, cb: (end: any, data?: any) => void) {
      cb(expectedError);
    };

    // Use reduce with 2 arguments: reducer and callback (no initial accumulator)
    const sink = reduce(
      function(acc: any, data: any) { return acc + data; },
      function(err: any, _val: any) {
        // Original: err === expectedError (because end !== true, so passes end)
        // Mutated:  err === null (because true ? null : end always gives null)
        expect(err).toBe(expectedError);
        done();
      }
    );

    // With 2 args, reduce returns a function that accepts a source
    sink(errorSource);
  });
});