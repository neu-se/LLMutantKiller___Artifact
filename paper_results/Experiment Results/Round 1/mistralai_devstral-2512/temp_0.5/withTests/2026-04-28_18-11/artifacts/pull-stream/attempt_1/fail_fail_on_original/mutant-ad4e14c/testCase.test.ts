import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('through with onEnd callback', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = through(
      (data) => {
        // No operation on data
      },
      (abort) => {
        onEndCalled = true;
        onEndValue = abort;
      }
    );

    pull(
      pull.values([1, 2, 3]),
      testThrough,
      pull.collect((err, result) => {
        if (err) {
          done(err);
          return;
        }

        // Verify the stream processed data correctly
        expect(result).toEqual([1, 2, 3]);

        // Verify onEnd was called with the correct value
        expect(onEndCalled).toBe(true);
        expect(onEndValue).toBe(true);

        done();
      })
    );
  });
});