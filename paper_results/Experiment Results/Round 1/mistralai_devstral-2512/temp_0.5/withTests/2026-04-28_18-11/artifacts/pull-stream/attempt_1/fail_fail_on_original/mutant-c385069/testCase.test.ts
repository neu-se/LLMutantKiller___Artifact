import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("asyncMap abort behavior", () => {
  it("should propagate abort when busy is false", (done) => {
    const error = new Error("test abort");
    let abortCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortCalled = true;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      asyncMap((data: any, cb: (err: any, data?: any) => void) => {
        setImmediate(() => cb(null, data));
      })
    );

    read(null, (end: any, data: any) => {
      // First read should succeed
      expect(data).toBe(1);
    });

    read(error, (end: any) => {
      // Abort should propagate
      expect(end).toBe(error);
      expect(abortCalled).toBe(true);
      done();
    });
  });
});