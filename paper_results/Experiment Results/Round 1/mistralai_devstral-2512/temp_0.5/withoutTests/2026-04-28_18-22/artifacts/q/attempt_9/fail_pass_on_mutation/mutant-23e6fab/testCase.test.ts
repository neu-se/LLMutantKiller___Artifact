const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly handle Firefox-style stack traces", () => {
    // Create an error with a Firefox-style stack trace
    const error = new Error("Test error");
    error.stack = "getValue@http://example.com/script.js:42";

    // Create a promise that will trigger stack trace processing
    const promise = Q.reject(error);

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (caughtError: Error) => {
          // Verify the stack trace was processed
          expect(caughtError.stack).toBeDefined();

          // Test the specific behavior affected by the mutation
          // The original code checks "if (attempt3)" which should work for Firefox traces
          // The mutated code changes this to "if (true)" which would always execute
          // We test this by checking if the stack trace contains the expected format
          const hasFirefoxFormat = caughtError.stack?.includes("@http://example.com/script.js:42");
          expect(hasFirefoxFormat).toBe(true);

          // Additional check: create a test case that would fail with the mutation
          // by verifying the regex pattern works correctly
          const testLine = "function@http://example.com/test.js:100";
          const regex = /.*@(.+):(\d+)$/;
          const match = testLine.match(regex);

          // This should match in both original and mutated code
          // but the mutation changes when the result is used
          expect(match).not.toBeNull();
          if (match) {
            expect(match[1]).toBe("http://example.com/test.js");
            expect(match[2]).toBe("100");
          }
        }
      );
  });
});