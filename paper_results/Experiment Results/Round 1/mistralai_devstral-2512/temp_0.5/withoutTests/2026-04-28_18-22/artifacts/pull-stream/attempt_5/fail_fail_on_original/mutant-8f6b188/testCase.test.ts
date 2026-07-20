import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with error when stream ends with error', (done) => {
    const testError = new Error('test error');
    let doneCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        // First call with data
        cb(null, 'data');
        // Second call with error
        cb(testError);
      }
    };

    const sink = drain(null, (end: any) => {
      doneCalled = true;
      expect(end).toBe(testError);
      done();
    });

    // Start the stream
    source(null, (end: any, data: any) => {
      if (end) {
        sink(end);
      } else {
        sink(null, data);
      }
    });
  });
});