const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly handle Firefox-style stack traces", () => {
    // Create a rejected promise with a Firefox-style stack trace
    const error = new Error("test error");
    error.stack = "myFunction@http://example.com/script.js:42\n" +
                  "anotherFunction@http://example.com/other.js:10";

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (caughtError: Error) => {
        // The mutation would cause incorrect parsing of attempt3 patterns
        // which would affect how stack traces are processed
        // This test verifies the stack trace contains the expected lines
        expect(caughtError.stack).toContain("script.js:42");
        expect(caughtError.stack).toContain("other.js:10");
      }
    );
  });
});