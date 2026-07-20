const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('take mutation test', () => {
  it('should properly terminate when stream ends', (done) => {
    const values = [1, 2, 3];
    let readCount = 0;
    let callbackCount = 0;

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

    // Read all values
    read(null, function(end: any, data: any) {
      callbackCount++;
      if (end) return;

      read(null, function(end: any, data: any) {
        callbackCount++;
        if (end) return;

        read(null, function(end: any, data: any) {
          callbackCount++;
          if (end) {
            // Now try to read again when ended is true and end is false
            read(null, function(end: any, data: any) {
              callbackCount++;
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
              if (callbackCount < 4) {
                done(new Error('Callback was never called - mutation detected'));
              }
            }, 100);
          }
        });
      });
    });
  });
});