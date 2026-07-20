// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", () => {
    // This test verifies that Q.nextTick correctly identifies Node.js environment
    // The mutation changes the condition from checking for process object to always true
    // which would break the proper environment detection

    // We'll test this by checking the behavior when process exists but is not a proper Node.js process
    // In the original code, it should fall back to other mechanisms
    // In the mutated code, it would incorrectly try to use process.nextTick

    // Save the original process object
    const originalProcess = global.process;

    // Create a mock process object that looks like Node.js but isn't
    global.process = {
      nextTick: originalProcess.nextTick,
      // Missing other Node.js specific properties
      toString: () => "[object Object]" // Not "[object process]"
    } as any;

    // Track which mechanism was used
    let mechanismUsed: string | null = null;

    // Mock setImmediate to detect if it's used as fallback
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = function(callback: () => void) {
      mechanismUsed = "setImmediate";
      originalSetImmediate.call(global, callback);
    };

    return new Promise<void>((resolve, reject) => {
      Q.nextTick(() => {
        // Restore original process and setImmediate
        global.process = originalProcess;
        global.setImmediate = originalSetImmediate;

        // In original code: should use setImmediate fallback because process.toString() !== "[object process]"
        // In mutated code: would try to use process.nextTick anyway
        try {
          expect(mechanismUsed).toBe("setImmediate");
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
});