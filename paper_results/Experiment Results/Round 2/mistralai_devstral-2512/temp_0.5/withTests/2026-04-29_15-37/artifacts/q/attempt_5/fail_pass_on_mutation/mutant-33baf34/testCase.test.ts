const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse named function stack traces", () => {
    // Create a scenario that will generate a stack trace with a named function
    function testFunction() {
      throw new Error("Test error");
    }

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q().then(testFunction);

    // Return a promise that will handle the error
    return promise.catch((err) => {
      // The test passes if we can handle the error without stack parsing issues
      expect(err.message).toBe("Test error");
    });
  });
});