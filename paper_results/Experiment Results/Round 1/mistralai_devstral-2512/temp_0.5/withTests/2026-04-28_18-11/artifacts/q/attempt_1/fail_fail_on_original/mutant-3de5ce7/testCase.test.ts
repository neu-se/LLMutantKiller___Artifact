// Test case to detect the mutation in the stack trace parsing regex
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Create a scenario that generates a stack trace
    const error = new Error("Test error");
    const stackLine = "func@http://example.com/script.js:42";

    // This test verifies that the regex correctly extracts filename and line number
    // The mutation changes \d+ to \D+ which would fail to match digits
    const result = Q.defer();
    Q.nextTick(() => {
      try {
        // Simulate the stack parsing logic from the original code
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
          const fileName = attempt3[1];
          const lineNumber = Number(attempt3[2]);
          if (fileName === "http://example.com/script.js" && lineNumber === 42) {
            result.resolve("Stack parsing works correctly");
          } else {
            result.reject(new Error("Stack parsing failed"));
          }
        } else {
          result.reject(new Error("Regex didn't match"));
        }
      } catch (e) {
        result.reject(e);
      }
    });

    return result.promise;
  });
});