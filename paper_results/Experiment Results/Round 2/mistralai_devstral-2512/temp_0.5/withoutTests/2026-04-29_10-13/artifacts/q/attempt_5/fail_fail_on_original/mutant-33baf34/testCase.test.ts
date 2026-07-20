const q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a promise that will be rejected to trigger stack trace parsing
    const promise = q.reject(new Error("Test error"));

    // Force promise inspection which uses getFileNameAndLineNumber internally
    const inspection = promise.inspect();

    // The original code should properly parse stack traces
    // The mutated code will fail to parse named function stack traces
    expect(inspection.state).toBe("rejected");
    expect(inspection.reason).toBeInstanceOf(Error);
    expect(inspection.reason.message).toBe("Test error");

    // Create a mock error with a stack trace containing named function pattern
    const error = new Error("Test");
    error.stack = "Error: Test\n    at functionName (/path/to/file.js:42:21)";

    // This will use getFileNameAndLineNumber internally
    const filtered = q.filterStackString(error.stack);
    expect(filtered).toContain("/path/to/file.js:42");
  });
});