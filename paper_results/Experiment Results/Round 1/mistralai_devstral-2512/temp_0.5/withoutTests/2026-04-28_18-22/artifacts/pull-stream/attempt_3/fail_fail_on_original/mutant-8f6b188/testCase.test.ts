import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with error when stream ends with non-true error', (done) => {
    const testError = new Error('test error');
    let doneCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // Simulate stream ending with error
        cb(testError);
      }
    };

    drain(null, (end: any) => {
      doneCalled = true;
      expect(end).toBe(testError);
      done();
    });

    // Start the stream
    const sink = drain(null, (end: any) => {
      doneCalled = true;
      expect(end).toBe(testError);
      done();
    });

    source(null, (end: any, data: any) => {
      if (end) {
        sink(end, data);
      }
    });
  });
});