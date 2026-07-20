import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle error end value correctly when stream ends with error', (done) => {
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

    // Start the stream by calling the sink with the source
    sink(source);
  });
});