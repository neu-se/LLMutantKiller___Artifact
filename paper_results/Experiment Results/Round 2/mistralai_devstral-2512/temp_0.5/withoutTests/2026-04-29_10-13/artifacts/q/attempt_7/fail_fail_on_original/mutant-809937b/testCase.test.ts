// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should not attempt to call process.emit when it's not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Track if process.emit was accessed
    let emitAccessed = false;
    let emitCalledWith = null;

    // Mock process.emit to track access
    Object.defineProperty(process, 'emit', {
      get: function() {
        emitAccessed = true;
        return function(event: string, ...args: any[]) {
          emitCalledWith = { event, args };
          return true;
        };
      },
      configurable: true
    });

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      Object.defineProperty(process, 'emit', {
        value: originalEmit,
        configurable: true
      });

      // In original code, emit should not be accessed when it's not a function
      // In mutated code, it will try to access emit (causing emitAccessed to be true)
      if (!emitAccessed) {
        done();
      } else {
        done(new Error("process.emit was accessed when it shouldn't be"));
      }
    }, 50);
  });
});