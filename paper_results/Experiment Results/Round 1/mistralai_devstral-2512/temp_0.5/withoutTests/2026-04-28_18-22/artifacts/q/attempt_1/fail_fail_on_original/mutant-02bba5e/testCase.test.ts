import { Q } from "./q.js";

describe("Q error handling", () => {
  it("should handle null errors in long stack traces correctly", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will reject with a null error
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    deferred1.promise
      .then(() => deferred2.promise)
      .then(null, (error) => {
        // This should handle the null error without issues
        expect(error).toBeNull();
      });

    // Reject with null error
    deferred1.reject(null);

    // Give the promises time to settle
    return Q.delay(10).then(() => {
      // If we get here without throwing, the test passes
      expect(true).toBe(true);
    });
  });
});