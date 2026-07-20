// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly handle stack frames with line numbers at boundaries", () => {
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
        "    at q.js:5:1", // Below qStartingLine
        "    at q.js:50:1", // Within range
        "    at q.js:150:1" // Above qEndingLine
      ].join("\n");
    }

    deferred.reject(error);

    return deferred.promise.catch((e: any) => {
      if (e.stack) {
        const lines = e.stack.split('\n');
        const hasBelowRange = lines.some((line: string) => line.includes('q.js:5:1'));
        const hasAboveRange = lines.some((line: string) => line.includes('q.js:150:1'));

        // With original code:
        // - Line 5 should be filtered (lineNumber >= qStartingLine is false)
        // - Line 150 should be filtered (lineNumber <= qEndingLine is false)
        // With mutated code:
        // - Line 5 might not be filtered (lineNumber <= qEndingLine is true)
        // - Line 150 might not be filtered (lineNumber >= qStartingLine is true)

        // The test expects these boundary cases to be handled correctly
        // We'll check that at least one of these problematic lines is filtered
        expect(hasBelowRange || hasAboveRange).toBe(false);
      }
      return Promise.resolve();
    });
  });
});