// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should process stack trace lines correctly", () => {
    // Create an error with a multi-line stack trace
    const error = new Error("Test error");
    const stackLines = error.stack?.split('\n') || [];

    // Ensure we have multiple lines to test the loop
    if (stackLines.length < 2) {
      stackLines.push("    at Test.test", "    at another frame");
      error.stack = stackLines.join('\n');
    }

    // Create a promise that will trigger stack filtering
    const promise = Q.reject(error);

    return promise.then(
      () => {},
      (err: Error) => {
        // The mutated code changes the loop condition from i < lines.length to i >= lines.length
        // This means the loop will never execute, resulting in an empty filtered stack
        const filteredStack = err.stack?.split('\n') || [];

        // With the mutation, the loop never runs so filteredStack should be empty
        // With the original code, it should contain at least some lines
        expect(filteredStack.length).toBeGreaterThan(0);

        // More specific check: the filtered stack should contain non-empty lines
        const nonEmptyLines = filteredStack.filter(line => line.trim().length > 0);
        expect(nonEmptyLines.length).toBeGreaterThan(0);
      }
    );
  });
});