const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through - onEnd behavior', () => {
  it('should call onEnd with null when abort is true', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = through(
      (data: any) => { /* no-op */ },
      (abort: any) => {
        onEndCalled = true;
        onEndValue = abort;
      }
    );

    const values = [1, 2, 3];
    let index = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (index >= values.length) {
        cb(true);
      } else {
        cb(null, values[index++]);
      }
    };

    const read = pull(
      source,
      testThrough,
      pull.drain(
        () => { /* no-op */ },
        () => {
          // After stream ends, verify onEnd was not called
          expect(onEndCalled).toBe(false);
          done();
        }
      )
    );

    // Start reading
    read(null, () => {});

    // Abort with true after some time
    setTimeout(() => {
      read(true, (abortEnd: any) => {
        // Verify onEnd was called with null when abort is true
        expect(onEndCalled).toBe(true);
        expect(onEndValue).toBe(null);
        done();
      });
    }, 10);
  });
});