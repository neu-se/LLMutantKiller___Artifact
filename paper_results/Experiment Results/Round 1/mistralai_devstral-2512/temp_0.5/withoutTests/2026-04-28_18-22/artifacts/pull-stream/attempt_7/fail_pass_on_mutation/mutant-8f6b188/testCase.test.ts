import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle non-true error end value differently from true end value', (done) => {
    const testError = new Error('test error');
    let doneCalled = false;
    let doneValue: any = null;

    const source = (abort: any, cb: (end: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // First call with true (normal end)
        cb(true);
        // Second call with error (should trigger different behavior)
        cb(testError);
      }
    };

    const sink = drain(null, (end: any) => {
      doneCalled = true;
      doneValue = end;
    });

    // Start the stream
    sink(source);

    // Check after a short delay
    setTimeout(() => {
      expect(doneCalled).toBe(true);
      expect(doneValue).toBe(testError);
      done();
    }, 10);
  });
});