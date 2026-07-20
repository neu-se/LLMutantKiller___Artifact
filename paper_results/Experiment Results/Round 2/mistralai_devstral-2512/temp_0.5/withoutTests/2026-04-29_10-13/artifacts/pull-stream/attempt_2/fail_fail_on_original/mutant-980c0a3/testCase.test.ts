import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle stream ending with non-true error value correctly', (done) => {
    const error = new Error('test error');
    let doneCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const doneCallback = (end: any) => {
      doneCalled = true;
      expect(end).toBe(error);
      done();
    };

    const sink = drain(null, doneCallback);
    source(null, sink);

    setTimeout(() => {
      if (!doneCalled) {
        done(new Error('done callback was not called'));
      }
    }, 100);
  });
});