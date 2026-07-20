// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter stack frames at the starting line boundary", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // Check if the stack trace contains frames at the exact starting line
      const stackLines = error.stack.split('\n');
      const hasStartingLineFrame = stackLines.some((line: string) =>
        line.includes('q.js') && line.includes('at') &&
        line.includes('qStartingLine') && !line.includes('From previous event')
      );
      expect(hasStartingLineFrame).toBe(false);
    }
  });
});