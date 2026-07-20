// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should not over-filter stack traces", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a function that will appear in the stack trace
    function applicationFunction() {
      const deferred = Q.defer();
      const error = new Error("Test error from application");
      deferred.reject(error);
      return deferred.promise;
    }

    // Call the function to create a stack trace
    const promise = applicationFunction();

    // Force synchronous handling to capture the stack
    let stackTrace = "";
    promise.catch((e: Error) => {
      stackTrace = e.stack || "";
    });

    // The mutation changes the condition from checking line numbers to always true
    // This causes ALL frames to be filtered (including application frames)
    // while original should only filter Q internal frames

    // In original code, stack should contain application frames
    // In mutated code, all frames will be filtered out
    const hasApplicationFrames = stackTrace.includes("applicationFunction") ||
                               stackTrace.includes("at ") ||
                               stackTrace.split('\n').length > 1;

    expect(hasApplicationFrames).toBe(true);
  });
});