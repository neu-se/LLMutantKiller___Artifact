import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick error handling", () => {
  it("should handle errors asynchronously in non-Node environments", (done) => {
    // Save original process
    const originalProcess = global.process;

    // Simulate non-Node environment
    delete (global as any).process;

    // Track if error was thrown synchronously
    let syncError = false;

    try {
      Q.nextTick(() => {
        throw new Error("Test error");
      });

      // In original code (non-Node), error should be thrown asynchronously
      // In mutated code, error will be thrown synchronously
    } catch (e) {
      syncError = true;
    }

    // Restore process
    global.process = originalProcess;

    // Set up error handler
    let asyncErrorHandled = false;
    const originalOnerror = Q.onerror;
    Q.onerror = (error) => {
      asyncErrorHandled = true;
      expect(error.message).toBe("Test error");

      // In original code, this should be called (async error handling)
      // In mutated code, this won't be called (sync error was already thrown)
      expect(syncError).toBe(false);
      Q.onerror = originalOnerror;
      done();
    };

    // Give time for async error handling
    setTimeout(() => {
      if (!asyncErrorHandled) {
        // This means error was handled synchronously (mutated behavior)
        expect(syncError).toBe(false);
        Q.onerror = originalOnerror;
        done();
      }
    }, 10);
  });
});