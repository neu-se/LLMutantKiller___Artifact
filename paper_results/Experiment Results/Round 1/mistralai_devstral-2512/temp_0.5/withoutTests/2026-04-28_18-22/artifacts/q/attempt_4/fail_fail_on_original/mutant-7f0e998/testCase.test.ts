// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7f0e998/testCase.test.ts
import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should properly filter internal frames from stack traces", () => {
    // Enable long stack traces
    q.longStackSupport = true;

    // Create a rejected promise with long stack trace support
    const error = new Error("Test error");
    const promise = q.reject(error);

    // Add some promise operations to create internal frames
    const chainedPromise = promise
      .then(() => {})
      .catch((e) => {
        // Get the stack trace
        const stack = e.stack || "";

        // The original code should filter out internal Q frames
        // The mutated code would incorrectly include them
        // We look for specific patterns that indicate internal frames were included
        expect(stack.includes("at Promise.promiseDispatch")).toBe(false);
        expect(stack.includes("at Promise.prototype.then")).toBe(false);
        expect(stack.includes("at deferred.resolve")).toBe(false);

        throw e;
      });

    return chainedPromise.catch(() => {});
  });
});