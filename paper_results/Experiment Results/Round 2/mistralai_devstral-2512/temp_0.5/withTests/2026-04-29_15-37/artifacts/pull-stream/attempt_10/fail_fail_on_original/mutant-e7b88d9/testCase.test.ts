const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('take mutation test', () => {
  it('should call callback when stream ends and end is false', (done) => {
    const values = [1, 2, 3];
    let readCount = 0;
    let callbackCalled = false;

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
        return n < 2;
      })
    );

    // Read all values to reach end state
    read(null, function(end: any, data: any) {
      if (end) return;

      read(null, function(end: any, data: any) {
        if (end) return;

        read(null, function(end: any, data: any) {
          if (end) {
            // Now try to read when ended=true and end=false
            // This should trigger the mutated code path
            read(null, function(end: any, data: any) {
              callbackCalled = true;
              if (end === true) {
                done();
              } else {
                done(new Error('Expected end to be true'));
              }
            });

            // Check if callback was called
            setTimeout(() => {
              if (!callbackCalled) {
                done(new Error('Callback was never called - mutation detected'));
              }
            }, 1);
          }
        });
      });
    });
  }, 50);
});