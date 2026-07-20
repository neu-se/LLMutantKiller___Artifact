// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f96bf22/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should filter internal and node frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("test error"));

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Return a promise that checks the stack trace filtering
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // The stack should not contain internal Q frames when filtered
        const stackLines = error.stack?.split("\n") || [];
        const hasInternalFrames = stackLines.some(line =>
          line.includes("q.js") || line.includes("(module.js:") || line.includes("(node.js:")
        );
        // In the original code, internal frames should be filtered out
        // In the mutated code (if true), they won't be filtered
        expect(hasInternalFrames).toBe(false);
        return Q.resolve();
      }
    );
  });
});