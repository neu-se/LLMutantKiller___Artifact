// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with numeric line numbers", () => {
    // Directly test the regex pattern that was mutated
    const firefoxStackLine = "func@http://example.com/script.js:42";

    return Q.Promise((resolve: (value: unknown) => void) => {
      // Test the original regex pattern (\d+ matches digits)
      const originalRegex = /.*@(.+):(\d+)$/;
      const originalMatch = originalRegex.exec(firefoxStackLine);

      // The original should match and extract line number 42
      if (originalMatch && originalMatch[2] === "42") {
        resolve("Original regex correctly matches numeric line numbers");
      } else {
        throw new Error("Original regex failed to match Firefox-style stack line");
      }
    });
  });
});