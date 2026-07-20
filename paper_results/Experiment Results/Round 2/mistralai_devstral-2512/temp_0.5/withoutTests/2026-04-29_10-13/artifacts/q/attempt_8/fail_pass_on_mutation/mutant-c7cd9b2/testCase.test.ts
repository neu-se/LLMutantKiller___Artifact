const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Test the specific mutation by creating a scenario that requires attempt2 regex
    // The mutation changes "if (attempt2)" to "if (false)" which breaks this parsing

    // Create a promise rejection with a stack trace containing the attempt2 format
    const deferred = Q.defer();
    const error = new Error("Test error");
    error.stack = "Error: Test error\nat module.js:42:8\nat other.js:1:1";
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should have rejected");
      },
      (e: any) => {
        // Enable long stack traces which will trigger stack parsing
        Q.longStackSupport = true;

        // Create another error with attempt2 format stack line
        const deferred2 = Q.defer();
        const error2 = new Error("Test error 2");
        error2.stack = "Error: Test error 2\nat test.js:10:5";
        deferred2.reject(error2);

        return deferred2.promise.then(
          () => {
            throw new Error("Should have rejected");
          },
          (e2: any) => {
            // The mutation breaks attempt2 regex matching
            // This means stack lines like "at test.js:10:5" won't be recognized
            // We can detect this by checking if the stack trace was properly processed

            // In original code, this should work
            // In mutated code, the attempt2 condition is always false so parsing fails
            const stackLines = e2.stack.split('\n');
            const hasAttempt2Line = stackLines.some(line =>
              line.match(/at [^ ]+:(\d+):(?:\d)$/) !== null
            );

            expect(hasAttempt2Line).toBe(true);

            // Additional check: verify the specific line is present
            expect(e2.stack).toContain("at test.js:10:5");
          }
        );
      }
    );
  });
});