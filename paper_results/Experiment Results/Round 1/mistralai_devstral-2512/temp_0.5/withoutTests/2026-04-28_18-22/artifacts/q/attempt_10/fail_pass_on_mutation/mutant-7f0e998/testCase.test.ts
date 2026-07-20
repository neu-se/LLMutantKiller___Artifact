// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7f0e998/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const promise = q.reject(error);

    // Add operations to create internal frames
    const chainedPromise = promise
      .then(() => {})
      .catch((e: Error) => {
        // Get the stack trace
        const stack = e.stack || "";

        // The original code should filter out internal Q frames
        // The mutated code would incorrectly include them
        // We look for specific patterns that indicate internal frames were included
        if (stack.includes("at Promise.promiseDispatch") ||
            stack.includes("at deferred.resolve") ||
            stack.includes("at nextTick") ||
            stack.includes("at flush") ||
            stack.includes("at runSingle") ||
            stack.includes("at makeStackTraceLong") ||
            stack.includes("at filterStackString") ||
            stack.includes("at isInternalFrame")) {
          throw new Error("Internal frames not filtered");
        }
        throw e;
      });

    return chainedPromise.catch((e: Error) => {
      // If we get here with "Internal frames not filtered", the test should fail
      if (e.message === "Internal frames not filtered") {
        throw e;
      }
      // Otherwise it's the expected error
    });
  });
});