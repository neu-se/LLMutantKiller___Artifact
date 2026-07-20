// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should correctly check process.emit type before calling", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Track if process.emit was called incorrectly
    let emitCalledIncorrectly = false;

    // Mock process.emit to be a non-function value that will throw if called
    Object.defineProperty(process, 'emit', {
      value: function() {
        emitCalledIncorrectly = true;
        throw new Error("process.emit is not a function");
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
      // In mutated code, it will try to call emit (causing emitCalledIncorrectly to be true)
      if (!emitCalledIncorrectly) {
        done();
      } else {
        done(new Error("process.emit was called incorrectly"));
      }
    }, 50);
  });
});