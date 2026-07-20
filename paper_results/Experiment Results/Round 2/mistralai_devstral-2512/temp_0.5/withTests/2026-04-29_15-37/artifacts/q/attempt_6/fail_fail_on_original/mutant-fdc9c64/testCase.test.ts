// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_6/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly filter stack frames based on line number ranges", () => {
    // The mutation changes the condition from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a custom stack trace with specific line numbers
    if (error.stack) {
      error.stack = [
        "Error: Test error",
        "    at test.js:1:1", // Different file - should never be filtered
        "    at q.js:10:1", // At qStartingLine - should be filtered in both
        "    at q.js:5:1", // Below qStartingLine - key test case
        "    at q.js:100:1", // At qEndingLine - should be filtered in both
        "    at q.js:200:1" // Above qEndingLine - key test case
      ].join("\n");
    }

    deferred.reject(error);

    return deferred.promise.catch((e: any) => {
      if (e.stack) {
        const lines = e.stack.split('\n');
        const hasBelowRange = lines.some((line: string) => line.includes('q.js:5:1'));
        const hasAboveRange = lines.some((line: string) => line.includes('q.js:200:1'));

        // With original code:
        // - Line 5 should be filtered (lineNumber >= qStartingLine is false)
        // - Line 200 should be filtered (lineNumber <= qEndingLine is false)
        // With mutated code:
        // - Line 5 might not be filtered (lineNumber <= qEndingLine is true)
        // - Line 200 might not be filtered (lineNumber >= qStartingLine is true)

        // The test expects both boundary lines to be filtered in original code
        // This assertion will fail with the mutation because it's less strict
        expect(hasBelowRange).toBe(false);
        expect(hasAboveRange).toBe(false);
      }
      return Promise.resolve();
    });
  });
});