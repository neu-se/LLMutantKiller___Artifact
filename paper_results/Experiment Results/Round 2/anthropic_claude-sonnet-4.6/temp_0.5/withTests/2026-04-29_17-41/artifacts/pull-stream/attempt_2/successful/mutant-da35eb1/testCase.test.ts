import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find - error propagation when no match found', () => {
  it('should pass the actual error to callback when stream ends with an error and no item was found', (done) => {
    const expectedError = new Error('stream error');
    
    // Create a source that immediately errors
    const errorSource = (_abort: any, cb: (err: any, data?: any) => void) => {
      cb(expectedError);
    };
    
    const sink = find(
      (d: any) => d === 'never-matches',
      (err: any, data: any) => {
        expect(err).toBe(expectedError);
        expect(data).toBeNull();
        done();
      }
    );
    
    sink(errorSource);
  });
});