// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-919acb6/testCase.test.ts
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain with error handling", () => {
  it("should handle non-true end values correctly", (done) => {
    const error = new Error("test error");
    let callbackCalled = false;

    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(
      null,
      (err: any) => {
        callbackCalled = true;
        expect(err).toBe(error);
        done();
      }
    );

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    (pull as any).default(source, sink);

    setTimeout(() => {
      if (!callbackCalled) {
        done(new Error("Callback was not called"));
      }
    }, 100);
  });
});