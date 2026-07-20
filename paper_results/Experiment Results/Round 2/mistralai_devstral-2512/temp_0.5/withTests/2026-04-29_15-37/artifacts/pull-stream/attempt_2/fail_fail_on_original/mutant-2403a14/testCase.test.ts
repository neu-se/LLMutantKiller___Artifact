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

    const read = pull(
      pull.values([1, 2, 3]),
      testThrough
    );

    read(null, (end: any, data: any) => {
      if (end) {
        // After reading all values, abort with true
        read(true, (abortEnd: any) => {
          // Verify onEnd was called with null when abort is true
          expect(onEndCalled).toBe(true);
          expect(onEndValue).toBe(null);
          done();
        });
      }
    });
  });
});