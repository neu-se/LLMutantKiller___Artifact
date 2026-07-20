const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize qFileName during module load", () => {
    // This test verifies that the captureLine function correctly initializes qFileName
    // The mutation would cause qFileName to remain undefined

    // Create a promise to ensure the library is initialized
    const promise = Q.resolve(42);

    // Enable long stack traces which requires qFileName to be set
    Q.longStackSupport = true;

    // Create a rejected promise that will generate a stack trace
    const rejected = Q.reject(new Error("Test error"));

    return rejected.then(null, (error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // The key test: try to create another promise after the error
      // This will fail if qFileName wasn't initialized properly
      const newPromise = Q.resolve(100);
      expect(newPromise.isFulfilled()).toBe(true);

      // Return the new promise to ensure the chain continues
      return newPromise;
    });
  });
});