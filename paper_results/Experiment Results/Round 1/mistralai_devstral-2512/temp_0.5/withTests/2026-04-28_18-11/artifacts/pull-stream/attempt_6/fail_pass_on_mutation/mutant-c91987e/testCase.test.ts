import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should call read with abort when sink.abort is invoked', (done) => {
    let abortWasCalled = false;
    let callbackWasCalled = false;

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
      callbackWasCalled = true;
    });

    // Start the stream
    drainSink(source);

    // Immediately abort
    drainSink.abort();

    setTimeout(() => {
      expect(abortWasCalled).toBe(true);
      expect(callbackWasCalled).toBe(true);
      done();
    }, 100);
  });
});