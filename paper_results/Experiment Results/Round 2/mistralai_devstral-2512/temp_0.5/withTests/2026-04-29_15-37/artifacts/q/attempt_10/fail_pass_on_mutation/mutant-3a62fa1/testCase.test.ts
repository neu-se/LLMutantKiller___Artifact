// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick Node.js environment detection", () => {
  it("should correctly detect Node.js environment by checking process object", () => {
    // This test verifies that Q.nextTick correctly identifies Node.js environment
    // The mutation changes the condition from checking for process object to always true
    // which would break the proper environment detection

    // We'll test this by checking if Q.nextTick throws when process is not a proper Node.js process
    // In the original code, it should handle this gracefully
    // In the mutated code, it would try to access process.domain which would throw

    // Save the original process object
    const originalProcess = global.process;

    // Create a mock process object that looks like Node.js but isn't
    global.process = {
      nextTick: originalProcess.nextTick,
      toString: () => "[object Object]" // Not "[object process]"
    } as any;

    // This should work in original code (falls back to other mechanisms)
    // But fails in mutated code (tries to access process.domain)
    expect(() => {
      Q.nextTick(() => {
        // Restore original process
        global.process = originalProcess;
      });
    }).not.toThrow();

    // Restore original process immediately
    global.process = originalProcess;
  });
});