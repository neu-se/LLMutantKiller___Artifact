const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber function", () => {
  it("should correctly extract file name and line number from named function stack line", () => {
    // Access the internal function through the Q module
    const getFileNameAndLineNumber = Q().constructor._getFileNameAndLineNumber;
    const stackLine = "at functionName (/path/to/file.js:42:24)";
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["/path/to/file.js", 42]);
  });
});