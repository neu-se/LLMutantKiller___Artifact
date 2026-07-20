// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly identify internal stack frames based on line numbers", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // Check if the stack trace contains the expected line number filtering behavior
      const stackLines = error.stack.split('\n');
      const hasFilteredFrames = stackLines.some((line: string) =>
        line.includes('q.js') && line.includes('at') && line.includes('qStartingLine')
      );
      expect(hasFilteredFrames).toBe(false);
    }
  });
});