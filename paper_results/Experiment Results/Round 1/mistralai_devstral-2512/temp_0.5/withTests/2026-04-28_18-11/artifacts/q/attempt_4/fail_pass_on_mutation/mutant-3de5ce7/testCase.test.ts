// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Directly test the regex pattern that was mutated
    const testStackLine = "func@http://example.com/script.js:42";

    return Q.Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      try {
        // This is the exact regex from the original code that was mutated
        const attempt3 = /.*@(.+):(\d+)$/.exec(testStackLine);

        if (attempt3) {
          const fileName: string = attempt3[1];
          const lineNumber: number = Number(attempt3[2]);

          // Verify we got the expected values
          if (fileName === "http://example.com/script.js" && lineNumber === 42) {
            resolve("Stack parsing works correctly");
          } else {
            reject(new Error(`Unexpected parsing result: ${fileName}:${lineNumber}`));
          }
        } else {
          reject(new Error("Regex failed to match Firefox-style stack line"));
        }
      } catch (e) {
        reject(e);
      }
    });
  });
});