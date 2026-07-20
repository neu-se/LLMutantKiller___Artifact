// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Track if process.emit was called
    let emitCalled = false;

    // Mock process.emit to be a non-function value
    process.emit = undefined as any;

    // Override process.emit to track calls (this shouldn't be called in original code)
    const originalProcess = process;
    Object.defineProperty(process, 'emit', {
      get: function() {
        emitCalled = true;
        return undefined;
      },
      configurable: true
    });

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      Object.defineProperty(process, 'emit', {
        value: originalEmit,
        configurable: true
      });

      // In original code, emit should not be called when it's not a function
      // In mutated code, it will try to call emit (causing an error)
      if (!emitCalled) {
        done();
      } else {
        done(new Error("process.emit was called when it shouldn't be"));
      }
    }, 50);
  });
});