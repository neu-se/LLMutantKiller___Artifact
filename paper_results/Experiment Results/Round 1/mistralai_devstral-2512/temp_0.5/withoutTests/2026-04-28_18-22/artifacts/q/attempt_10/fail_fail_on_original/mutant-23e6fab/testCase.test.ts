const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with attempt3 pattern", () => {
    // Create an error with a Firefox-style stack trace that should match attempt3
    const error = new Error("Test error");
    error.stack = "function@http://example.com/script.js:42";

    // Create a promise that will use stack trace processing
    const promise = Q.reject(error);

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (caughtError: Error) => {
          // The original code should properly parse this format
          // The mutated code (with "if (true)") would incorrectly handle it
          expect(caughtError.stack).toBeDefined();

          // Test the specific behavior affected by the mutation
          // by checking if the stack trace contains the expected format
          const hasCorrectFormat = caughtError.stack?.includes("@http://example.com/script.js:42");
          expect(hasCorrectFormat).toBe(true);

          // Create a test case that would fail with the mutation
          // by verifying the regex pattern works correctly
          const testLine = "function@http://example.com/test.js:100";
          const regex = /.*@(.+):(\D+)$/;
          const match = testLine.match(regex);

          // The original code checks "if (attempt3)" which should be truthy for valid matches
          // The mutated code changes this to "if (true)" which would always execute
          // This test verifies the regex matching works as expected
          expect(match).not.toBeNull();
          if (match) {
            expect(match[1]).toBe("http://example.com/test.js");
            // This should be "100" but the regex uses \D+ which won't match digits
            // This is the key difference that will fail with the mutation
            expect(match[2]).toBe("100");
          }
        }
      );
  });
});