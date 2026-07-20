// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly filter stack frames with line numbers outside the expected range", () => {
    // The mutation changes the condition from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a custom stack trace with specific line numbers
    if (error.stack) {
      error.stack = [
        "Error: Test error",
        "    at test.js:1:1", // Different file - should never be filtered
        "    at q.js:1:1", // Very low line number - key test case
        "    at q.js:1000:1" // Very high line number - key test case
      ].join("\n");
    }

    deferred.reject(error);

    return deferred.promise.catch((e: any) => {
      if (e.stack) {
        const lines = e.stack.split('\n');
        const hasVeryLowLine = lines.some((line: string) => line.includes('q.js:1:1'));
        const hasVeryHighLine = lines.some((line: string) => line.includes('q.js:1000:1'));

        // With original code:
        // - Line 1 should be filtered (lineNumber >= qStartingLine is false)
        // - Line 1000 should be filtered (lineNumber <= qEndingLine is false)
        // With mutated code:
        // - Line 1 might not be filtered (lineNumber <= qEndingLine is true)
        // - Line 1000 might not be filtered (lineNumber >= qStartingLine is true)

        // The test expects these extreme lines to be filtered in original code
        // This assertion will fail with the mutation because it's less strict
        expect(hasVeryLowLine).toBe(false);
        expect(hasVeryHighLine).toBe(false);
      }
      return Promise.resolve();
    });
  });
});