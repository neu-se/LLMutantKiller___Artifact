const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should pass abort error to read callback when op returns false', (done) => {
    let readCalls = 0;
    const mockRead = (end: any, cb: (end?: any, data?: any) => void) => {
      readCalls++;
      if (readCalls === 1) {
        cb(null, 'data');
      } else if (readCalls === 2) {
        // Verify that the abort error is passed to read
        expect(end).toBe(true);
        cb(true);
      }
    };

    const mockOp = (data: any) => {
      return false; // This should trigger the abort path
    };

    const mockDone = (err: any) => {
      // In the original code, done should be called with true
      // In the mutated code, done should be called with true as well
      // But the key difference is what gets passed to read()
      expect(err).toBe(true);
      done();
    };

    const sink = drain(mockOp, mockDone);
    sink(mockRead);
  });
});