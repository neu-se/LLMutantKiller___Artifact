import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle error end value correctly', (done) => {
    const error = new Error('test error');
    let doneCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    drain(null, (end: any) => {
      doneCalled = true;
      expect(end).toBe(error);
      done();
    });

    source(null, (end: any, data: any) => {
      if (end) {
        // Stream ended
      } else {
        // Process data
      }
    });

    setTimeout(() => {
      if (!doneCalled) {
        done(new Error('Test timed out - done callback was not called'));
      }
    }, 100);
  });
});