import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('through - onEnd behavior', () => {
  it('should call onEnd with null when abort is true', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = through(
      (data) => { /* no-op */ },
      (abort) => {
        onEndCalled = true;
        onEndValue = abort;
      }
    );

    const read = pull(
      pull.values([1, 2, 3]),
      testThrough
    );

    read(null, (end, data) => {
      if (end) {
        // After reading all values, abort with true
        read(true, (abortEnd) => {
          // Verify onEnd was called with null when abort is true
          expect(onEndCalled).toBe(true);
          expect(onEndValue).toBe(null);
          done();
        });
      }
    });
  });
});