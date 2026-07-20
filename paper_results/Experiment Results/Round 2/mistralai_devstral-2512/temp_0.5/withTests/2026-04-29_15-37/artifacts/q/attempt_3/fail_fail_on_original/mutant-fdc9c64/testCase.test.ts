// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly filter stack frames based on line numbers", () => {
    // The mutation changes the condition from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a scenario where we can observe the difference in stack frame filtering
    // We'll create a promise chain that generates stack traces and verify filtering

    // First, enable long stack traces if they're supported
    const qModule: any = Q;
    const originalLongStackSupport = qModule.longStackSupport;

    // Create a promise that will generate a stack trace with specific line numbers
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Add a custom stack trace that includes lines we want to test
    if (error.stack) {
      error.stack = [
        "Error: Test error",
        "    at testFunction (test.js:10:5)", // Different file - should not be filtered
        "    at q.js:5:10", // Below qStartingLine - should be filtered in original, might not in mutated
        "    at q.js:50:15", // Within range - should be filtered in both
        "    at q.js:200:20" // Above qEndingLine - should be filtered in original, might not in mutated
      ].join("\n");
    }

    deferred.reject(error);

    return deferred.promise.catch((e: any) => {
      if (e.stack) {
        // Count q.js lines in the filtered stack
        const qLines = e.stack.split('\n').filter((line: string) => line.includes('q.js'));
        const nonQLines = e.stack.split('\n').filter((line: string) => !line.includes('q.js'));

        // With the original code, most q.js lines should be filtered out
        // With the mutated code, more q.js lines might remain due to the OR condition
        // The key difference is that the mutated version will be less strict about filtering

        // We expect at most 1 q.js line to remain (the one that's truly outside the range)
        // The mutation might allow more lines through
        expect(qLines.length).toBeLessThanOrEqual(1);

        // We should still have the non-q.js lines
        expect(nonQLines.length).toBeGreaterThan(0);
      }
      return Promise.resolve();
    });
  });
});