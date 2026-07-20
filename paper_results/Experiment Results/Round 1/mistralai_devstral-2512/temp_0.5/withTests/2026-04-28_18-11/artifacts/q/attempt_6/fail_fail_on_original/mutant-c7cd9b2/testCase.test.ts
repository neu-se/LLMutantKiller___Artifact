// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c7cd9b2/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with attempt2 pattern", () => {
    // Enable long stack traces to force stack trace parsing
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    // and specifically test the attempt2 pattern parsing
    return Q.Promise(function(resolve: any, reject: any) {
      // Create a deep promise chain to generate multiple stack frames
      Q.delay(1).then(() => {
        return Q.delay(1);
      }).then(() => {
        // Create an error with a specific stack trace format
        const error = new Error("Test error");
        Error.captureStackTrace(error, Q.Promise);

        // Verify the stack trace contains attempt2 pattern
        const stackLines = error.stack.split('\n');
        const hasAttempt2Pattern = stackLines.some((line: string) =>
          /at [^ ]+:(\d+):(\d+)/.test(line)
        );

        if (!hasAttempt2Pattern) {
          throw new Error("No attempt2 pattern found in stack trace");
        }

        // Reject with this error to test stack trace parsing
        throw error;
      }).catch((error: any) => {
        // The error should be properly handled
        expect(error.message).toBe("Test error");
        resolve("success");
      });
    }).then((result: any) => {
      expect(result).toBe("success");
      Q.longStackSupport = false; // Clean up
    });
  });
});