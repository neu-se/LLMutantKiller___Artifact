const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last=false', (done) => {
    let terminateCalled = false;
    let lastValueDuringTerminate = null;

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
      terminateCalled = true;
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
        if (terminateCalled && lastValueDuringTerminate === false) {
          done(); // Original code behavior
        } else {
          done(new Error(`last was ${lastValueDuringTerminate} during termination (expected false)`));
        }
      })
    );
  });
});