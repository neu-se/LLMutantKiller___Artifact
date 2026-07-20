// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should only track unhandled rejections when process.emit exists", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to track calls
    let emitCalled = false;
    process.emit = function(eventName: string) {
      if (eventName === "unhandledRejection") {
        emitCalled = true;
      }
      return true;
    };

    // Create and reject a promise
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));

    // Force tracking to happen
    Q.resetUnhandledRejections();
    Q.getUnhandledReasons();

    // Restore original emit
    process.emit = originalEmit;

    // In original code, emit should not be called (condition checks process.emit existence)
    // In mutated code, emit will be called (condition is always true)
    expect(emitCalled).toBe(false);
  });
});