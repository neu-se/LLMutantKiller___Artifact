import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the callback with the correct error when aborting', (done) => {
    let called = false;
    const sink = drainModule.default(null, null);
    sink.abort(true, (err: any) => {
      expect(err).toBe(true);
      called = true;
      done();
    });
    // If the callback is not called after a certain time, the test will fail
    setTimeout(() => {
      if (!called) {
        done(new Error('Callback was not called'));
      }
    }, 100);
  });
});