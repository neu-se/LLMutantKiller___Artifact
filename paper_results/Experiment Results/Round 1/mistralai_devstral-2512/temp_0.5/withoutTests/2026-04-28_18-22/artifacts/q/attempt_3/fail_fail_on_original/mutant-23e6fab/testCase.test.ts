const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a delay to ensure the stack trace is captured
    return promise
      .delay(1)
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (error: Error) => {
          // Verify the error has a stack trace
          expect(error.stack).toBeDefined();

          // Test the getFileNameAndLineNumber function by creating a mock stack line
          // that matches Firefox's format and checking if it's parsed correctly
          const mockStackLine = "function@http://example.com/script.js:42";
          const result = (Q as any).getFileNameAndLineNumber(mockStackLine);

          // The original code should correctly parse this format
          expect(result).toEqual(["http://example.com/script.js", 42]);

          // The mutated code (with "if (true)") would incorrectly parse this
          // and potentially return wrong results
        }
      );
  });
});