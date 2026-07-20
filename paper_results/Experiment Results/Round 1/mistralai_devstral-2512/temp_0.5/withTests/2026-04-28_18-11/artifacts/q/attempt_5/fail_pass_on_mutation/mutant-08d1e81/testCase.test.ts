// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not throw when process.emit is undefined", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Set process.emit to undefined to simulate environment without it
    (process as any).emit = undefined;

    // This should not throw in original code but will throw in mutated code
    expect(() => {
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));
      Q.resetUnhandledRejections();
      Q.getUnhandledReasons();
    }).not.toThrow();

    // Restore original emit
    (process as any).emit = originalEmit;
  });
});