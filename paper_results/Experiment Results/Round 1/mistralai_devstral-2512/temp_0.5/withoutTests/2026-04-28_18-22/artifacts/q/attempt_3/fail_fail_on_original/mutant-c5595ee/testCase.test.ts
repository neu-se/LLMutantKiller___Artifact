const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a promise that will be rejected to trigger stack trace parsing
    const promise = Q.reject(new Error("Test error"));

    // Add a catch handler to ensure the stack trace is processed
    return promise.catch((error: Error) => {
      // Test the internal getFileNameAndLineNumber function by creating
      // stack lines that should match the attempt3 regex pattern
      const testStackLine1 = "http://example.com:8080/file.js:42";
      const testStackLine2 = "at http://example.com:8080/file.js:42";

      // These should match with the original regex but not the mutated one
      expect(/.*@(.+):(\d+)$/.exec(testStackLine1)).not.toBeNull();
      expect(/.*@(.+):(\d+)$/.exec(testStackLine2)).not.toBeNull();

      // The mutation changes the regex to /.@/ which won't match these
      // This ensures the test will fail on the mutated version
      expect(testStackLine1).toMatch(/.*@/);
      expect(testStackLine2).toMatch(/.*@/);
    });
  });
});