// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is undefined", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Set process.emit to undefined to simulate environment without it
    process.emit = undefined;

    // Mock console.error to track if it's called (for error cases)
    let errorCalled = false;
    const originalError = console.error;
    console.error = function() {
      errorCalled = true;
    };

    // Create and reject a promise
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));

    // Force tracking to happen
    Q.resetUnhandledRejections();
    Q.getUnhandledReasons();

    // Restore originals
    process.emit = originalEmit;
    console.error = originalError;

    // In original code, this should work fine (condition checks process.emit existence)
    // In mutated code, this will try to call undefined function
    expect(errorCalled).toBe(false);
  });
});