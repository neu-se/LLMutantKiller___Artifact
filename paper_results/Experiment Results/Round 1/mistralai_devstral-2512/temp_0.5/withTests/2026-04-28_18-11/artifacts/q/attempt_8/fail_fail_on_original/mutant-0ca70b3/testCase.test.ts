// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should correctly iterate through stack trace lines", () => {
    // Create an error with a stack trace
    const error = new Error("Test error");
    const originalStack = error.stack;

    // Create a promise that will trigger stack filtering
    const promise = Q.reject(error);

    return promise.then(
      () => {},
      (err: Error) => {
        // The mutated code changes the loop condition from i < lines.length to i >= lines.length
        // This means the loop will never execute, resulting in an empty filtered stack
        const filteredStack = err.stack;

        // With the mutation, the filtered stack should be empty or malformed
        // With the original code, it should contain filtered lines
        if (originalStack) {
          // The original stack has lines, so filtered stack should too
          expect(filteredStack).toBeDefined();
          expect(filteredStack?.length).toBeGreaterThan(0);

          // More specific check: the filtered stack should not be identical to original
          // (some lines should have been filtered out)
          expect(filteredStack).not.toEqual(originalStack);
        }
      }
    );
  });
});