// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c7cd9b2/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with attempt2 pattern", () => {
    // Enable long stack traces to force stack trace parsing
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    // and test the attempt2 pattern parsing specifically
    return Q.Promise(function(resolve: any, reject: any) {
      // Create an error with a specific stack trace format
      const error = new Error("Test error");
      Error.captureStackTrace(error, Q.Promise);

      // Find a stack line that matches attempt2 pattern
      const stackLines = error.stack.split('\n');
      const attempt2Line = stackLines.find((line: string) =>
        /at [^ ]+:(\d+):(\d+)/.test(line)
      );

      if (!attempt2Line) {
        reject(new Error("No attempt2 pattern found in stack trace"));
        return;
      }

      // Create a rejected promise that will use stack trace parsing
      Q.reject(error).catch((e: any) => {
        // Verify the error was properly handled
        expect(e).toBe(error);
        resolve("success");
      });
    }).then((result: any) => {
      expect(result).toBe("success");
      Q.longStackSupport = false; // Clean up
    });
  });
});