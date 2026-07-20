const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last=false', (done) => {
    let lastValueDuringTerminate: boolean | null = null;

    // Create a source that will trigger termination
    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        // End immediately to trigger termination
        cb(true);
      }
    };

    // Monkey-patch the terminate function to capture the last value
    const takeModule = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");
    const originalTerminate = takeModule.__test_terminate;
    takeModule.__test_terminate = function(cb: any) {
      // Capture the last value before it's modified
      lastValueDuringTerminate = this.last;
      return originalTerminate.call(this, cb);
    };

    const takeStream = pull.take(function(n: number) {
      return n < 2;
    }, { last: false });

    pull(
      source,
      takeStream,
      pull.collect(function(err: any, results: any[]) {
        // The key difference is whether last was false during termination
        // In original code: last = false
        // In mutated code: last = true
        if (lastValueDuringTerminate === false) {
          done(); // Original code behavior
        } else {
          done(new Error(`last was ${lastValueDuringTerminate} during termination (expected false)`));
        }
      })
    );
  });
});