// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should handle process.emit being undefined without throwing", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Set process.emit to undefined
    (process as any).emit = undefined;

    // This should not throw in original code but will throw in mutated code
    let errorThrown = false;
    try {
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));
      Q.resetUnhandledRejections();
      Q.getUnhandledReasons();
    } catch (e) {
      errorThrown = true;
    }

    // Restore original emit
    (process as any).emit = originalEmit;

    // In original code, no error should be thrown
    // In mutated code, TypeError will be thrown
    expect(errorThrown).toBe(false);
  });
});