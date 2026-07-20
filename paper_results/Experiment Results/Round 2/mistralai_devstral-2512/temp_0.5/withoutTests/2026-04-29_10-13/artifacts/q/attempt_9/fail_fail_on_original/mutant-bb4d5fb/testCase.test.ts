// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-bb4d5fb/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal stack frames when long stack traces are enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");
    deferred.reject(error);

    // Get the promise's stack trace
    const promise = deferred.promise;
    const stack = promise.stack;

    // The original code should filter out internal Q frames
    // The mutated code (return true &&) would not filter them properly
    // We check that the stack does NOT contain the q.js filename in the original version
    // but WILL contain it in the mutated version
    expect(stack).toBeDefined();

    // This assertion will pass on original (filtered) but fail on mutated (not filtered)
    const hasInternalFrames = stack.includes("q.js");
    expect(hasInternalFrames).toBe(false);
  });
});