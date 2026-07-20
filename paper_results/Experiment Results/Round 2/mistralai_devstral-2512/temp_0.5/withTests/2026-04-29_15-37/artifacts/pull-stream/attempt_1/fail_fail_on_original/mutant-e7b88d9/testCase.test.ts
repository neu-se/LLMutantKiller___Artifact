import * as pull from "../";

describe('take mutation test', () => {
  it('should handle end state correctly when ended is true and end is false', (done) => {
    const values = [1, 2, 3, 4, 5];
    let readCount = 0;

    const source = function (abort: any, cb: any) {
      if (abort) {
        cb(abort);
      } else if (readCount < values.length) {
        cb(null, values[readCount++]);
      } else {
        cb(true);
      }
    };

    const takeStream = pull.take(function(n: number) {
      return n < 3;
    });

    const read = pull(
      source,
      takeStream
    );

    // First read to get some data
    read(null, function(end: any, data: any) {
      if (end) {
        done(new Error('Stream ended unexpectedly'));
        return;
      }

      // Second read to get more data
      read(null, function(end: any, data: any) {
        if (end) {
          done(new Error('Stream ended unexpectedly'));
          return;
        }

        // Third read to get more data
        read(null, function(end: any, data: any) {
          if (end) {
            done(new Error('Stream ended unexpectedly'));
            return;
          }

          // Now try to read when we should have ended
          read(null, function(end: any, data: any) {
            // In the original code, this should call cb(ended) where ended is true
            // In the mutated code, this does nothing, so the callback is never called
            if (end === true) {
              done();
            } else {
              // If we get here, the mutation is present (callback was called with wrong value or not at all)
              done(new Error('Expected stream to end with true'));
            }
          });
        });
      });
    });
  });
});