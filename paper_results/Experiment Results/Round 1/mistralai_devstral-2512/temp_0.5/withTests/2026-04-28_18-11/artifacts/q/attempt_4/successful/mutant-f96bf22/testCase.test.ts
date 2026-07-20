// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f96bf22/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should filter internal frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const deferred = Q.defer();
    let promise = deferred.promise;

    // Add multiple layers to ensure internal frames are generated
    for (let i = 0; i < 3; i++) {
      promise = promise.then((val) => val);
    }

    // Reject with an error
    const testError = new Error("test error");
    deferred.reject(testError);

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        const stack = error.stack;
        expect(stack).toBeDefined();

        // Check for the presence of internal Q frames
        const hasQFrames = stack?.includes("q.js") || false;
        const hasNodeFrames = stack?.includes("(module.js:") || stack?.includes("(node.js:") || false;

        // In the original code, internal frames should be filtered out
        // In the mutated code (with `if (true)`), they won't be filtered
        // So we expect NO internal frames in the original, but they WILL be present in the mutated version
        expect(hasQFrames || hasNodeFrames).toBe(false);
      }
    );
  });
});