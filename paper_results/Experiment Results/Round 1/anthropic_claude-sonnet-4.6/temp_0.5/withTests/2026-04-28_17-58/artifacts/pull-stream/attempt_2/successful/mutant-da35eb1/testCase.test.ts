import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find sink', () => {
  it('should pass actual stream errors to the callback when no item is found', (done) => {
    const actualError = new Error('stream error');
    
    // Create a source that first emits a value that doesn't match, then errors
    let step = 0;
    const errorSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (step === 0) {
        step++;
        cb(null, 1); // emit a value that won't match
      } else {
        cb(actualError); // end with an actual error
      }
    };

    const sink = find(
      (data: any) => data === 999, // will never match
      (err: any, result: any) => {
        // Original: err should be the actual error
        // Mutated: err will be null (bug)
        expect(err).toBe(actualError);
        expect(result).toBeNull();
        done();
      }
    );

    sink(errorSource);
  });
});