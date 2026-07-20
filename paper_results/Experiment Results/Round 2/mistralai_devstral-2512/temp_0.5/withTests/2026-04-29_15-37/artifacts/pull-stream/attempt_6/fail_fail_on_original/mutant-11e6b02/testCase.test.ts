const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last=false', (done) => {
    let terminateCalledWithLastFalse = false;

    // Mock the terminate function to check if last is set to false
    const originalTake = pull.take;
    pull.take = function(test: any, opts: any) {
      const takeStream = originalTake.call(this, test, opts);
      return function(read: any) {
        const originalRead = read;
        return function(end: any, cb: any) {
          if (end === true) {
            // This is the terminate call
            return originalRead.call(this, end, function(err: any) {
              // Check if last is false in the original code
              // In mutated code, last would be true
              if (opts && opts.last === false) {
                terminateCalledWithLastFalse = true;
              }
              cb(err || true);
            });
          }
          return originalRead.call(this, end, cb);
        };
      };
    };

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // End immediately to trigger termination
      }
    };

    const takeStream = pull.take(function(n: number) {
      return n < 2;
    }, { last: false });

    pull(
      source,
      takeStream,
      pull.collect(function(err: any, results: any[]) {
        // The key difference is whether last was false during termination
        if (terminateCalledWithLastFalse) {
          done(); // Original code behavior
        } else {
          done(new Error('last was not false during termination (mutation detected)'));
        }
      })
    );
  });
});