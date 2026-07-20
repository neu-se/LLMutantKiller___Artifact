// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Create a scenario that will trigger stack trace parsing
    return Q.reject(new Error("Test error"))
      .catch((error) => {
        // Create a mock stack trace with Firefox format
        const mockStack = [
          "Error: Test error",
          "    at func@http://example.com/script.js:42",
          "    at otherFunc@http://example.com/other.js:123"
        ].join("\n");

        // Override the stack to test parsing
        error.stack = mockStack;

        // Force Q to process the stack trace by creating a rejected promise
        const deferred = Q.defer();
        Q.nextTick(() => {
          try {
            // This will trigger the stack trace parsing code path
            const promise = Q.reject(error);
            const stackLines = promise.stack.split("\n");

            // Find the Firefox-style line and test the regex
            const firefoxLine = stackLines.find(line => line.includes("@http://"));
            if (firefoxLine) {
              const attempt3 = /.*@(.+):(\d+)$/.exec(firefoxLine);
              if (attempt3) {
                const lineNumber = Number(attempt3[2]);
                if (isNaN(lineNumber)) {
                  deferred.reject(new Error("Line number parsing failed - got NaN"));
                } else if (lineNumber === 42 || lineNumber === 123) {
                  deferred.resolve("Stack parsing works correctly");
                } else {
                  deferred.reject(new Error(`Unexpected line number: ${lineNumber}`));
                }
              } else {
                deferred.reject(new Error("Regex didn't match Firefox-style stack line"));
              }
            } else {
              deferred.reject(new Error("No Firefox-style stack line found"));
            }
          } catch (e) {
            deferred.reject(e);
          }
        });

        return deferred.promise;
      });
  });
});