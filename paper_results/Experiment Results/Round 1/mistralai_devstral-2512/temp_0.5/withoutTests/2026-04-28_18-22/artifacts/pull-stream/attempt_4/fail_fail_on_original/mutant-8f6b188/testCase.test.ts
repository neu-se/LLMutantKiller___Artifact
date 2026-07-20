import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle non-true error end value correctly', (done) => {
    const testError = new Error('test error');
    let doneCalled = false;

    const source = (abort: any, cb: (end: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // Simulate stream ending with error
        cb(testError);
      }
    };

    const sink = drain(null, (end: any) => {
      doneCalled = true;
      expect(end).toBe(testError);
      done();
    });

    // Start the stream
    source(null, sink);
  });
});