import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should properly abort when sink.abort is called with callback', (done) => {
    let abortWasCalled = false;
    let abortCallbackWasCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortWasCalled = true;
        cb(abort);
      } else {
        cb(null, 'test');
      }
    };

    const drainSink = drain((data: any) => {
      return false;
    }, () => {
      // Done callback
    });

    // Start the stream
    drainSink(source);

    // Abort with callback
    drainSink.abort(null, (err: any) => {
      abortCallbackWasCalled = true;
      expect(err).toBe(true);
    });

    setTimeout(() => {
      expect(abortWasCalled).toBe(true);
      expect(abortCallbackWasCalled).toBe(true);
      done();
    }, 100);
  });
});