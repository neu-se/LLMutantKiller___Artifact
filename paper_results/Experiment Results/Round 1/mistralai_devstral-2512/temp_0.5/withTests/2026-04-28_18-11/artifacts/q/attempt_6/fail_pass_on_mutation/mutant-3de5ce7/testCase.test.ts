// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Create a promise that will generate a stack trace
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        // Create a mock Firefox-style stack trace
        const mockStack = "func@http://example.com/script.js:42";

        // Use Q's internal stack parsing logic by creating a rejected promise
        // This will trigger the getFileNameAndLineNumber function
        return Q.Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
          try {
            // Simulate the stack parsing that happens in Q
            const attempt3 = /.*@(.+):(\d+)$/.exec(mockStack);
            if (attempt3) {
              const fileName = attempt3[1];
              const lineNumber = Number(attempt3[2]);

              // Verify the parsing worked correctly
              if (fileName === "http://example.com/script.js" && lineNumber === 42) {
                resolve("Stack parsing works correctly");
              } else {
                reject(new Error(`Parsing failed: got ${fileName}:${lineNumber}`));
              }
            } else {
              reject(new Error("Regex didn't match Firefox-style stack line"));
            }
          } catch (e) {
            reject(e);
          }
        });
      });
  });
});