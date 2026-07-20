const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with attempt3 pattern", () => {
    // Create a mock error with Firefox-style stack trace
    const error = new Error("test");
    error.stack = "function@file.js:42";

    // Access the internal function through the Q module
    const getFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
    const result = getFileNameAndLineNumber(error.stack);

    // Verify the parsing works correctly
    expect(result).toEqual(["file.js", 42]);
  });
});