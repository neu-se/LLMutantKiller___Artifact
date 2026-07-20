const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should pass abort value to read callback when op returns false', (done) => {
    let readCalls = 0;
    const mockRead = (end: any, cb: (end?: any, data?: any) => void) => {
      readCalls++;
      if (readCalls === 1) {
        cb(null, 'data');
      } else if (readCalls === 2) {
        // The key difference: original passes (abort || true), mutated passes true
        // If we pass a non-true abort value, we can detect the difference
        expect(end).toBe('custom-abort');
        cb(true);
      }
    };

    const mockOp = (data: any) => {
      return false; // This should trigger the abort path
    };

    const mockDone = (err: any) => {
      expect(err).toBe(true);
      done();
    };

    const sink = drain(mockOp, mockDone);
    // Set a custom abort value before calling sink
    sink.abort('custom-abort');
    sink(mockRead);
  }, 100); // Increased timeout to 100ms
});