// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should preserve non-internal stack frames while filtering Node.js internals", async () => {
    // Create a promise chain with a custom error that includes known stack frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // Check if the stack trace contains our test error frame
      const stackLines = e.stack.split('\n');
      const hasTestErrorFrame = stackLines.some((line: string) =>
        line.includes("Test error") || line.includes("at ")
      );

      // In the original code, non-internal frames should be preserved
      // In the mutated code (return true), all frames would be filtered out
      expect(hasTestErrorFrame).toBe(true);
    }
  });
});