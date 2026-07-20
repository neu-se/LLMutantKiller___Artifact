import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior when process.emit is not a function", () => {
  it("should not throw when process.emit is not a function and a rejection is handled", async () => {
    const originalEmit = process.emit;
    
    // Replace process.emit with a non-function to distinguish original from mutant:
    // Original code checks `typeof process.emit === "function"` before calling it,
    // so it would skip the call safely.
    // Mutated code replaces that check with `true`, so it would try to call
    // process.emit even when it's not a function, causing a TypeError.
    (process as any).emit = "not-a-function";

    try {
      Q.resetUnhandledRejections();

      const error = new Error("test rejection");
      
      // Create a rejected promise - this calls trackRejection
      const rejected = Q.reject(error);
      
      // Handle the rejection - this calls untrackRejection
      // In the mutated code, the runAfter callback will try to call
      // process.emit("rejectionHandled", ...) even though process.emit is not a function
      const handled = rejected.fail(function() {
        return "handled";
      });

      // Wait for async operations to complete
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });

      // If we reach here without an uncaught error, the original code worked correctly
      // The mutated code would have scheduled a call to a non-function via runAfter,
      // but we need to verify the promise chain itself works
      const result = await handled;
      expect(result).toBe("handled");
      
      // The unhandled reasons should be empty since we handled the rejection
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      (process as any).emit = originalEmit;
    }
  });
});