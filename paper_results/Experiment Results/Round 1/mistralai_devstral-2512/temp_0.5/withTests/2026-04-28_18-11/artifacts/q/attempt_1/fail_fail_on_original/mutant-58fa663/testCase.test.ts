import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should correctly handle process object without emit function", () => {
    // Create a mock process object without emit function
    const mockProcess = { env: {} };
    // @ts-ignore - We're intentionally testing with a mock process
    const originalProcess = global.process;
    // @ts-ignore - We're intentionally testing with a mock process
    global.process = mockProcess;

    try {
      // Reset unhandled rejections tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // The mutation would incorrectly track this rejection
      // because it uses OR instead of AND in the condition
      // Original: if (typeof process === "object" && typeof process.emit === "function")
      // Mutated:  if (typeof process === "object" || typeof process.emit === "function")

      // In the mutated version, this would incorrectly try to access process.emit
      // even though it doesn't exist, potentially causing issues

      // Verify no unhandled rejection was tracked (since process.emit doesn't exist)
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original process
      // @ts-ignore - Restoring original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
    }
  });
});