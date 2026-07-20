import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle error end value correctly when end is not true', (done) => {
    const testError = new Error('test error');
    let doneCalled = false;
    let doneValue: any = null;

    const source = (abort: any, cb: (end: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // Simulate stream ending with error (not true)
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