import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should properly abort when sink.abort is called', (done) => {
    let abortWasCalled = false;
    let readWasCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortWasCalled = true;
        cb(abort);
      } else {
        readWasCalled = true;
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

    // Immediately abort
    drainSink.abort();

    setTimeout(() => {
      expect(abortWasCalled).toBe(true);
      done();
    }, 100);
  });
});