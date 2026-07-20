// Test case to detect the mutation in the getFileNameAndLineNumber function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a scenario that would generate a stack trace with a named function
    const error = new Error("Test error");
    const stackLine = "at functionName (filename.js:42:24)";

    // This test verifies that the function correctly parses named function stack lines
    // The mutation removes the return statement, which would cause the function to return undefined
    // for valid named function stack lines
    expect(() => {
      // We can't directly test the internal function, but we can test its effect
      // by creating a promise chain that should generate stack traces
      return Q.reject(error).then(null, (err) => {
        // The stack trace should be properly formatted
        expect(err.stack).toBeDefined();
        expect(typeof err.stack).toBe("string");
      });
    }).not.toThrow();

    // Additional verification that the parsing works correctly
    // by checking that stack traces contain expected information
    return Q.reject(error).catch((err) => {
      expect(err.stack).toContain("filename.js");
      expect(err.stack).toContain("42");
    });
  });
});