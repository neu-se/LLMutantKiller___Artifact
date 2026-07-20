import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the callback with the correct error when aborting', (done) => {
    const sink = drainModule.default(null, null);
    let callbackCalled = false;
    sink.abort(null, (err: any) => {
      callbackCalled = true;
      if (err === false) {
        done.fail('Callback was called with incorrect error');
      } else {
        done();
      }
    });
    // If the callback is not called after a certain time, the test will fail
    setTimeout(() => {
      if (!callbackCalled) {
        done.fail('Callback was not called');
      }
    }, 100);
  });
});