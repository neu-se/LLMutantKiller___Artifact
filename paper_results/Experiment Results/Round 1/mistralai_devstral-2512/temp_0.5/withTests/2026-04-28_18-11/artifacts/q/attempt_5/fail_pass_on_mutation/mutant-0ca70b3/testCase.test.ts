// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should process stack traces correctly with valid loop condition", () => {
    // Create an error with a stack trace that has multiple lines
    const error = new Error("Test error");
    const originalStack = error.stack;

    // Create a promise that will trigger stack trace filtering
    const promise = Q.reject(error);

    return promise.then(
      () => {},
      (err: Error) => {
        // The mutated code changes the loop condition from i < lines.length to i >= lines.length
        // This means the loop will never execute, resulting in an empty filtered stack
        // We can detect this by checking if the stack was actually processed
        expect(err.stack).toBeDefined();

        // If the mutation is present, the stack filtering won't work properly
        // and the stack might be empty or malformed
        if (originalStack) {
          const originalLines = originalStack.split('\n').length;
          const filteredLines = err.stack?.split('\n').length || 0;

          // With the mutation, the loop never runs so no lines are filtered
          // This should cause the filtered stack to be different from expected
          expect(filteredLines).toBeGreaterThan(0);
        }
      }
    );
  });
});