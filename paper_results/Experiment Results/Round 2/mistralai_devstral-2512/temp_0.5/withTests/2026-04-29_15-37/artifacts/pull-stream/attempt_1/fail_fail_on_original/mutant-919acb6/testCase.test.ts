// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-919acb6/testCase.test.ts
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain with error handling", () => {
  it("should handle non-true end values correctly", (done) => {
    const error = new Error("test error");
    let callbackCalled = false;

    const sink = drain(
      null,
      (err) => {
        callbackCalled = true;
        expect(err).toBe(error);
        done();
      }
    );

    // Simulate a source that ends with an error
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    pull(source, sink);

    // Ensure the test fails if the callback is not called within a reasonable time
    setTimeout(() => {
      if (!callbackCalled) {
        done(new Error("Callback was not called"));
      }
    }, 100);
  });
});