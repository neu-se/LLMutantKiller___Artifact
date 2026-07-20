const pull = require("../../../../../../../../../../../subject_repositories/pull-stream");

describe('take mutation test', () => {
  it('should correctly handle stream termination with last=false', (done) => {
    let aborted = false;
    let readCount = 0;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        aborted = true;
        cb(abort);
      } else if (readCount < 3) {
        cb(null, readCount++);
      } else {
        cb(true);
      }
    };

    const takeStream = pull.take(function(n: number) {
      return n < 2;
    }, { last: false });

    pull(
      source,
      takeStream,
      pull.collect(function(err: any, results: any[]) {
        if (err) {
          done(err);
          return;
        }
        // With last=false, we should get exactly 2 items (0, 1)
        // The mutation changes last=true which would affect termination behavior
        if (results.length === 2 && !aborted) {
          done();
        } else {
          done(new Error(`Expected 2 items but got ${results.length}, aborted: ${aborted}`));
        }
      })
    );
  });
});