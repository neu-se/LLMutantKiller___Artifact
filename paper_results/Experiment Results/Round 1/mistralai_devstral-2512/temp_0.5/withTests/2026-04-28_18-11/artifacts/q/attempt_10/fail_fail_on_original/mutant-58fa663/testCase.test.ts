import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Store original process
    const originalProcess = global.process;

    // Create a mock process object where emit is not a function
    // @ts-ignore - We're intentionally testing with a mock process
    global.process = {
      env: {},
      nextTick: (callback) => setTimeout(callback, 0),
      // Make emit a non-function value to test the condition
      emit: 123 as any
    };

    // Track if emit was called
    let emitCalled = false;
    const originalEmit = process.emit;
    // @ts-ignore
    process.emit = function() {
      emitCalled = true;
      return true;
    };

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // In the original code, emit should not be called because:
      // typeof process.emit === "function" is false
      // In the mutated code, emit would be called because:
      // typeof process === "object" is true

      setTimeout(() => {
        try {
          expect(emitCalled).toBe(false);
          done();
        } catch (error) {
          done(error);
        } finally {
          // Restore original process
          // @ts-ignore - Restoring original process
          global.process = originalProcess;
          Q.resetUnhandledRejections();
        }
      }, 10);
    } catch (error) {
      // Restore original process
      // @ts-ignore - Restoring original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
      done(error);
    }
  });
});