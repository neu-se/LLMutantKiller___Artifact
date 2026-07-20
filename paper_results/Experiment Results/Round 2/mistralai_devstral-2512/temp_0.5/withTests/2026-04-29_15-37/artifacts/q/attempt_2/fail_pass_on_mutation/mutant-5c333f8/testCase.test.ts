// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter internal stack frames correctly", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // The stack trace should not include Q library internal frames
      const stackLines = error.stack.split('\n');
      const hasInternalFrames = stackLines.some((line: string) =>
        line.includes('q.js') && line.includes('From previous event')
      );
      expect(hasInternalFrames).toBe(false);
    }
  });
});