// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7f0e998/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", () => {
    // Create a rejected promise that will generate a stack trace
    const error = new Error("Test error");
    const deferred = q.defer();
    deferred.reject(error);

    // Get the promise and force stack trace generation
    const promise = deferred.promise;

    // Add some operations to create internal frames
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
            stack.includes("q.js")) {
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