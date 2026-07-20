import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the callback with the correct error when aborting', (done) => {
    const sink = drainModule.default(null, null);
    let callbackCalled = false;
    sink.abort(true, (err: any) => {
      callbackCalled = true;
      expect(err).toBe(true);
      done();
    });
    // If the callback is not called after a certain time, the test will fail
    setTimeout(() => {
      if (!callbackCalled) {
        expect(false).toBe(true);
      }
    }, 100);
  });
});