const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal stack frames from Firefox-style traces", () => {
    // Create an error with a Firefox-style stack trace that includes internal frames
    const error = new Error("Test error");
    error.stack = [
      "function@http://example.com/script.js:42",
      "internalFunction@q.js:100:10",
      "anotherFunction@http://example.com/other.js:5"
    ].join("\n");

    // Create a promise that will use the stack trace filtering
    const promise = Q.reject(error);

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (caughtError: Error) => {
          // The original code should filter out internal frames (q.js)
          // The mutated code (with "if (true)") would incorrectly include them
          const filteredStack = caughtError.stack;
          expect(filteredStack).toBeDefined();

          // Check that internal frames are filtered out in original code
          // but would remain in mutated code
          const hasInternalFrame = filteredStack?.includes("q.js:100:10");
          expect(hasInternalFrame).toBe(false);
        }
      );
  });
});