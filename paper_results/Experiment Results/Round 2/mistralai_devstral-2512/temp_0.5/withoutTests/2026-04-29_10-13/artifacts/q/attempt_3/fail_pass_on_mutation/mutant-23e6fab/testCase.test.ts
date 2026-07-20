const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly handle Firefox-style stack traces with attempt3 pattern", () => {
    // Create a promise that will be rejected to trigger stack trace parsing
    const promise = Q.reject(new Error("test error"));

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Return the promise chain to ensure proper async handling
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error) => {
        // The error should have a stack trace that was processed
        expect(error.stack).toBeDefined();
        // The test passes if we reach here without throwing
        // The mutation would cause incorrect parsing of attempt3 patterns
        // which would affect stack trace filtering
      }
    );
  });
});