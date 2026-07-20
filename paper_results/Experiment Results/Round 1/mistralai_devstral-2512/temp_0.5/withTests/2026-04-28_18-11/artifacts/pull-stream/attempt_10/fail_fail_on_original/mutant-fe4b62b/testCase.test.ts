const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('drain abort behavior', () => {
  it('should handle abort with function as first argument correctly', (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

    let abortCallbackCalled = false;
    let abortCallbackValue: any = null;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'test-data');
      }
    };

    const sink = drain(function (data: any) {
      return false;
    }, function (err: any) {
      // This should not be called when abort is triggered
      done(new Error('Done callback should not be called on abort'));
    });

    // Create the pipeline and immediately call abort
    const pipeline = pull(source, sink);

    // The pipeline returns a readable stream
    pipeline(null, function (end: any, data: any) {
      // Immediately abort with a function as first argument
      (sink as any).abort(function (err: any) {
        abortCallbackCalled = true;
        abortCallbackValue = err;

        // In original code, err should be true
        // In mutated code, err should be false
        if (err === true) {
          done(); // Test passes for original code
        } else {
          done(new Error(`Expected err to be true, but got ${err}`)); // Test fails for mutated code
        }
      });
    });
  });
});