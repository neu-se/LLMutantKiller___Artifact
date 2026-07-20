// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should check process.emit existence before calling", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Set process.emit to undefined to simulate environment without it
    (process as any).emit = undefined;

    // Create a mock to detect if emit is called
    let emitCalled = false;
    Object.defineProperty(process, 'emit', {
      get: () => {
        return () => {
          emitCalled = true;
          return true;
        };
      },
      configurable: true
    });

    // This should not call emit in original code but will in mutated code
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));
    Q.resetUnhandledRejections();
    Q.getUnhandledReasons();

    // Restore original emit
    (process as any).emit = originalEmit;

    // In original code, emit should not be called (condition checks existence)
    // In mutated code, emit will be called (condition is always true)
    expect(emitCalled).toBe(false);
  });
});