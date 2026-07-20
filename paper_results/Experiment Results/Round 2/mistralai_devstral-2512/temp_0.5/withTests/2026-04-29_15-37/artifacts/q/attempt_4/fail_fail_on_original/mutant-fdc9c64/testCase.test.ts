// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_4/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly filter stack frames with line numbers outside range", () => {
    // The mutation changes the condition from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a promise chain that will generate stack traces
    // We'll test the specific case where line numbers are outside the expected range

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a custom stack that includes lines with specific characteristics
    if (error.stack) {
      error.stack = [
        "Error: Test error",
        "    at test.js:1:1", // Different file - should never be filtered
        "    at q.js:1:1", // Line 1 - below qStartingLine (should be filtered in original)
        "    at q.js:50:1", // Within range - should be filtered in both
        "    at q.js:999:1" // Very high line - above qEndingLine (should be filtered in original)
      ].join("\n");
    }

    deferred.reject(error);

    return deferred.promise.catch((e: any) => {
      if (e.stack) {
        const lines = e.stack.split('\n');
        const hasLine1 = lines.some((line: string) => line.includes('q.js:1:1'));
        const hasLine999 = lines.some((line: string) => line.includes('q.js:999:1'));

        // With original code:
        // - Line 1 should be filtered (lineNumber >= qStartingLine is false)
        // - Line 999 should be filtered (lineNumber <= qEndingLine is false)
        // With mutated code:
        // - Line 1 might not be filtered (lineNumber <= qEndingLine is true)
        // - Line 999 might not be filtered (lineNumber >= qStartingLine is true)

        // The test expects these lines to be filtered out in original code
        expect(hasLine1).toBe(false);
        expect(hasLine999).toBe(false);
      }
      return Promise.resolve();
    });
  });
});