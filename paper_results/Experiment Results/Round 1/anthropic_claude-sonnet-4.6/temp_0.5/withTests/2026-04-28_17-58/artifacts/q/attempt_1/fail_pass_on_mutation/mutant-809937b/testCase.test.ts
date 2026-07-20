import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit check", () => {
  it("should not throw when process.emit is not a function and a rejection is handled", async () => {
    // Save original process.emit
    const originalEmit = process.emit;

    try {
      // Replace process.emit with a non-function value
      // Original code checks `typeof process.emit === "function"` before calling it
      // Mutated code skips this check and would try to call process.emit directly
      (process as any).emit = "not-a-function";

      // Create a rejected promise - this triggers trackRejection
      const rejected = Q.reject(new Error("test rejection"));

      // Attach a handler - this triggers untrackRejection which contains the mutated code
      // In the mutated code, it will try to call process.emit("rejectionHandled", ...) 
      // but process.emit is not a function, causing a TypeError
      const handled = rejected.fail(function () {
        return "handled";
      });

      // Wait for async operations to complete
      await new Promise<void>((resolve) => {
        Q.nextTick(function () {
          Q.nextTick(function () {
            resolve();
          });
        });
      });

      // If we get here without throwing, the original code is running correctly
      // (it checked typeof process.emit === "function" and skipped the call)
      await handled;
    } finally {
      // Restore process.emit
      (process as any).emit = originalEmit;
    }
  });
});