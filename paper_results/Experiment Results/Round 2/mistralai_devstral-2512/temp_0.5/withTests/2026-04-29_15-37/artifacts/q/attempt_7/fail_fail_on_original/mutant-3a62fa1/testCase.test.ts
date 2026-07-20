// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick environment detection", () => {
  it("should handle missing process object gracefully", () => {
    // This test verifies that Q.nextTick handles missing process object
    // The mutation changes the condition from checking for process object to always true
    // which would cause it to fail when process doesn't exist

    // Save the original process object
    const originalProcess = global.process;

    try {
      // Remove process to simulate non-Node.js environment
      delete (global as any).process;

      // In original code: should use fallback mechanisms (setImmediate, MessageChannel, setTimeout)
      // In mutated code: would try to access process.nextTick and fail
      Q.nextTick(() => {
        // This callback should execute in original code using fallback
        // In mutated code, this would never be reached due to error
      });

      // Restore process immediately
      global.process = originalProcess;

      // If we get here without throwing, the test passes for original code
      // The mutated code would throw an error when trying to access process.nextTick
      expect(true).toBe(true);
    } catch (error) {
      // Restore process in case of error
      global.process = originalProcess;
      throw error;
    }
  });
});