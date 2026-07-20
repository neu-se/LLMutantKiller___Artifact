const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain abort behavior', () => {
  it('should handle abort with function as first argument correctly', (done) => {
    const sink = drain(function (data: any) {
      return false;
    }, function (err: any) {
      // This callback should not be called when abort is triggered
      done(new Error('Done callback should not be called on abort'));
    });

    // Call abort with a function as first argument
    (sink as any).abort(function (err: any) {
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