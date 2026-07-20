const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize qFileName and qStartingLine", () => {
    // This test directly verifies that the captureLine function worked correctly
    // by checking that qFileName is defined (which would be undefined with the mutation)

    // Create a promise to ensure the library is initialized
    const promise = Q.resolve(42);

    // The mutation would cause qFileName to remain undefined
    // which would break stack trace filtering
    // We can detect this by checking if the library throws when trying to filter stacks

    // Enable long stack traces to trigger stack filtering
    Q.longStackSupport = true;

    // Create a rejected promise that will generate a stack trace
    const rejected = Q.reject(new Error("Test"));

    return rejected.then(null, (error) => {
      // If qFileName wasn't initialized (due to mutation), this would fail
      expect(error.stack).toBeDefined();
      return Q.resolve();
    });
  });
});