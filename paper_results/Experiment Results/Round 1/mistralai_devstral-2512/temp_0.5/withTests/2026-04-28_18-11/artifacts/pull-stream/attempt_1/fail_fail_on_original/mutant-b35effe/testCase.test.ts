import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("find with error handling", () => {
  it("should pass error as-is when err is true", (done) => {
    const error = true;
    let callbackInvoked = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // End the stream without data
      }
    };

    find((data: any) => false, (err: any, result: any) => {
      callbackInvoked = true;
      // In the original code, when err is true, it should be passed as-is
      // In the mutated code, when err is true, it would be converted to null
      if (err === true) {
        done();
      } else {
        done(new Error("Expected err to be true, but got: " + err));
      }
    });

    pull(
      source,
      find((data: any) => false, (err: any, result: any) => {
        if (callbackInvoked) return;
        callbackInvoked = true;
        if (err === true) {
          done();
        } else {
          done(new Error("Expected err to be true, but got: " + err));
        }
      })
    );
  });
});