// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-63e4667/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.keys() mutation test", () => {
  it("should call dispatch with empty array argument", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const originalDispatch = promise.dispatch;
    let capturedArgs = null;

    // Override dispatch to capture arguments
    promise.dispatch = function(...args) {
      capturedArgs = args;
      return originalDispatch.apply(this, args);
    };

    promise.keys();

    // Restore original dispatch
    promise.dispatch = originalDispatch;

    expect(capturedArgs).toEqual(["keys", []]);
  });
});