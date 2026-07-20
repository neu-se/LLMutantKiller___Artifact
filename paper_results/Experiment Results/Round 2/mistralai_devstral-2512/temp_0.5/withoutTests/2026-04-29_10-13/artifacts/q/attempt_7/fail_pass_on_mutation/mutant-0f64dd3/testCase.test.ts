const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should fail when stack trace initialization is broken", () => {
    // This test forces the library to use stack trace filtering
    // The mutation would cause qFileName to remain undefined, breaking the filter

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Try to access the stack property which requires proper initialization
    return promise.then(null, (error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // Now test that the library can still create new promises
      // This will fail if qFileName wasn't initialized properly
      const newPromise = Q.resolve(42);
      expect(newPromise.isFulfilled()).toBe(true);
      return newPromise;
    });
  });
});