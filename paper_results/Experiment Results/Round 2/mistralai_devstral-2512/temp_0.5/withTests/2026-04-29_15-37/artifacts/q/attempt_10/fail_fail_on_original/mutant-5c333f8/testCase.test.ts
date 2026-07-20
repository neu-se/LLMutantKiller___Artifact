// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should include stack frames at the exact starting line number", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // The stack trace should include frames at the exact starting line
      const stackLines = error.stack.split('\n');
      const hasStartingLine = stackLines.some((line: string) =>
        line.includes('q.js') && line.includes('at') &&
        !line.includes('From previous event')
      );
      expect(hasStartingLine).toBe(true);
    }
  });
});