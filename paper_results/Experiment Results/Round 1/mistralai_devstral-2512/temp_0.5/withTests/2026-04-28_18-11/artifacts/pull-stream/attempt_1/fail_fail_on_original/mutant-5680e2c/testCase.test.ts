import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('through onEnd behavior', () => {
  it('should call onEnd with null when abort is true', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = through(
      (data) => {},
      (value) => {
        onEndCalled = true;
        onEndValue = value;
      }
    );

    const source = pull.values([1, 2, 3]);
    const sink = pull.drain(
      () => {},
      () => {
        // Verify onEnd was called with null when abort is true
        expect(onEndCalled).toBe(true);
        expect(onEndValue).toBe(null);
        done();
      }
    );

    const pipeline = pull(
      source,
      testThrough,
      sink
    );

    // Read first value
    pipeline(null, (end, data) => {
      if (!end) {
        // Abort with true
        pipeline(true, (end) => {
          // Should complete the test in the sink's onEnd
        });
      }
    });
  });
});