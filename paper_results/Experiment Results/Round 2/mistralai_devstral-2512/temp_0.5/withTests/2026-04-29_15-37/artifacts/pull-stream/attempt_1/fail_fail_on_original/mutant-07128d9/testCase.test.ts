import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain behavior with error handling', () => {
  it('should handle non-true end values correctly', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const drainSink = drain(function (data) {
      return true;
    }, function (err) {
      callbackCalled = true;
      if (err) {
        done.fail('Callback should not receive error');
      } else {
        done();
      }
    });

    const read = drainSink;

    // Simulate a read with an error (non-true end value)
    read(null, function (end, data) {
      if (!callbackCalled) {
        done.fail('Callback should have been called');
      }
    });

    // Trigger the error path
    read(error, function (end) {
      if (end !== error) {
        done.fail('Expected error to be propagated');
      }
    });
  });
});