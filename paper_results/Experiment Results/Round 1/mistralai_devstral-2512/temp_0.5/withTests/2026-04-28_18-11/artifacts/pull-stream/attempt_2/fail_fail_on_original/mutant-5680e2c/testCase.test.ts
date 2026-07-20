import pullThrough from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('through onEnd behavior', () => {
  it('should call onEnd with null when abort is true', (done) => {
    let onEndCalled = false;
    let onEndValue: any = null;

    const testThrough = pullThrough(
      (data: any) => {},
      (value: any) => {
        onEndCalled = true;
        onEndValue = value;
      }
    );

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const sink = (read: any) => {
      return (abort: any, cb: (end: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            setTimeout(() => {
              expect(onEndCalled).toBe(true);
              expect(onEndValue).toBe(null);
              done();
            }, 0);
          }
          cb(end);
        });
      };
    };

    const pipeline = pull(
      source,
      testThrough,
      sink
    );

    pipeline(null, (end: any, data: any) => {
      if (!end) {
        pipeline(true, (end: any) => {});
      }
    });
  });
});