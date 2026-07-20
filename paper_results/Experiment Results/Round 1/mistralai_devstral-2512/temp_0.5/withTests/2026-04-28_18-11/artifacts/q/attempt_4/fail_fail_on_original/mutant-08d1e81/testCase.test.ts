// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should handle missing process.emit gracefully", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Remove process.emit to simulate environment without it
    delete process.emit;

    // Create and reject a promise
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));

    // Force tracking to happen
    Q.resetUnhandledRejections();
    const reasons = Q.getUnhandledReasons();

    // Restore original emit
    process.emit = originalEmit;

    // In original code, this should work fine (condition checks process.emit existence)
    // In mutated code, this will throw TypeError when trying to call undefined
    expect(reasons.length).toBeGreaterThan(0);
  });
});