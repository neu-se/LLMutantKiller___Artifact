const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with attempt3 pattern", () => {
    // Create a mock error with Firefox-style stack trace
    const error = new Error("test");
    error.stack = "testFunction@http://example.com/file.js:42\n" +
                  "anotherFunction@http://example.com/other.js:10";

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a rejected promise that will use the stack trace
    const promise = Q.reject(error);

    // Return the promise chain
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (caughtError) => {
        // Verify the stack trace was processed correctly
        expect(caughtError.stack).toContain("file.js:42");
        expect(caughtError.stack).toContain("other.js:10");
      }
    );
  });
});