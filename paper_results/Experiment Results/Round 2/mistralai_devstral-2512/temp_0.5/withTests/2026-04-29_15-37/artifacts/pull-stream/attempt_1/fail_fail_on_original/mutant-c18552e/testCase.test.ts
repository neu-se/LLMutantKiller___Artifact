import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('through onEnd behavior', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = through(
      (data: any) => { /* no-op */ },
      (abort: any) => {
        onEndCalled = true;
        onEndValue = abort;
      }
    );

    const source = pull.values([1, 2, 3]);
    const sink = pull.collect((err: any, result: any) => {
      // Verify the stream completed successfully
      expect(result).toEqual([1, 2, 3]);
      // Verify onEnd was called with null (not true) when stream ended normally
      expect(onEndCalled).toBe(true);
      expect(onEndValue).toBe(null);
      done();
    });

    pull(source, testThrough, sink);
  });
});