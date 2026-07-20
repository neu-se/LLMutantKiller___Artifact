import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('take mutation test', () => {
  it('should properly handle ended state when stream is terminated', (done) => {
    let callbackInvoked = false;
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

    const read = pull(
      source,
      pull.take(function(n: number) {
        return n < 3;
      })
    );

    // Read until we get to the end condition
    read(null, function(end: any, data: any) {
      if (end) return;

      read(null, function(end: any, data: any) {
        if (end) return;

        read(null, function(end: any, data: any) {
          if (end) {
            // Now try to read again when ended should be true
            read(null, function(end: any, data: any) {
              callbackInvoked = true;
              // Original code should call cb(ended) with end=true
              // Mutated code does nothing, so callback won't be called
              if (end === true) {
                done();
              } else {
                done(new Error('Expected end to be true'));
              }
            });

            // Fail test if callback never gets called (mutation case)
            setTimeout(() => {
              if (!callbackInvoked) {
                done(new Error('Callback was never called - mutation detected'));
              }
            }, 100);
          }
        });
      });
    });
  });
});