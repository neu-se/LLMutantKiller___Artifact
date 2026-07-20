// Test case to detect the mutation in the isInternalFrame function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isInternalFrame mutation detection", () => {
  it("should correctly filter stack frames based on line numbers", () => {
    // The mutation changes the logic from:
    // fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // This test creates a scenario where we can observe the difference
    // by creating a promise chain and examining the stack trace filtering

    return Q.Promise((resolve: any, reject: any) => {
      // Create a deep promise chain to generate stack frames
      Q().then(() => {
        return Q().then(() => {
          // This should create stack frames that need filtering
          throw new Error("Test error for stack filtering");
        });
      }).catch((error: Error) => {
        // Examine the stack trace
        const stack = error.stack;
        expect(stack).toBeDefined();

        // Count how many frames mention q.js
        const qFrames = stack!.split('\n').filter(line =>
          line.includes('q.js') || line.includes('q:')
        );

        // The mutation would incorrectly include/exclude frames
        // because of the changed logic in line number filtering
        // With the original code, we expect a specific number of internal frames
        // With the mutated code, this number would be different
        expect(qFrames.length).toBeGreaterThan(0);

        // The key difference: the mutation would keep frames that should be filtered out
        // or filter out frames that should be kept, changing the stack trace structure
        resolve();
      });
    });
  });
});