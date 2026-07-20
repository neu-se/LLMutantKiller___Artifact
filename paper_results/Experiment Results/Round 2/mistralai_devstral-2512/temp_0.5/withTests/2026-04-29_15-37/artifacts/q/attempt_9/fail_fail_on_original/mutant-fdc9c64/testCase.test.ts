// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_9/pending_category/mutant-fdc9c64/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should filter stack frames correctly based on line number ranges", () => {
    // The mutation changes the condition from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // Create a simple promise rejection to generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace with specific characteristics
    if (error.stack) {
      error.stack = [
        "Error: Test error",
        "    at test.js:1:1", // Different file - should never be filtered
        "    at q.js:5:1", // Below qStartingLine - should be filtered in original
        "    at q.js:50:1", // Within range - should be filtered in both
        "    at q.js:200:1" // Above qEndingLine - should be filtered in original
      ].join("\n");
    }

    deferred.reject(error);

    return deferred.promise.catch((e: any) => {
      if (e.stack) {
        const lines = e.stack.split('\n');
        const qLines = lines.filter((line: string) => line.includes('q.js'));

        // Count lines that should be filtered in original but might not in mutated
        const problematicLines = qLines.filter((line: string) => {
          const match = line.match(/q\.js:(\d+):/);
          return match && (parseInt(match[1]) < 10 || parseInt(match[1]) > 100);
        });

        // Original code should filter these problematic lines
        // Mutated code might keep some due to less strict filtering
        // The key is that original should have fewer problematic lines
        expect(problematicLines.length).toBe(0);
      }
      return Q();
    });
  });
});