import * as pull from "../";

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

    const read = pull(
      source,
      takeStream
    );

    read(null, function (end: any, data: any) {
      if (end) {
        // Stream should end after reading 2 items (0, 1)
        // The third read should trigger termination
        setImmediate(() => {
          // With last=false, the stream should terminate without including the last item
          // The mutation changes last=true which would affect termination behavior
          if (aborted) {
            done();
          } else {
            done(new Error('Stream was not properly aborted'));
          }
        });
      }
    });
  });
});