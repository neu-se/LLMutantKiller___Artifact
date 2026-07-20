// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f96bf22/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should properly filter stack traces by removing internal frames", () => {
    // Create a deep promise chain to generate a meaningful stack trace
    const error = new Error("test error");
    let promise = Q.reject(error);

    // Add several layers to the promise chain
    for (let i = 0; i < 5; i++) {
      promise = promise.then(null, (e) => {
        throw e;
      });
    }

    // Enable long stack traces
    Q.longStackSupport = true;

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (caughtError: Error) => {
        const stack = caughtError.stack;
        expect(stack).toBeDefined();

        // Count how many lines contain "q.js" (internal frames)
        const stackLines = stack?.split("\n") || [];
        const internalFrameCount = stackLines.filter(line =>
          line.includes("q.js") ||
          line.includes("(module.js:") ||
          line.includes("(node.js:")
        ).length;

        // In the original code, internal frames should be filtered out
        // In the mutated code (with `if (true)`), they won't be filtered
        // We expect at least some internal frames to be present in the original
        // but they should be filtered out, leaving fewer than we'd see with the mutation
        expect(internalFrameCount).toBeLessThan(3);
      }
    );
  });
});