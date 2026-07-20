const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library getFileNameAndLineNumber", () => {
  it("should correctly parse named function stack traces", () => {
    const Q = qModule;
    const stackLine = "at functionName (/path/to/file.js:42:21)";
    const result = Q.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["/path/to/file.js", 42]);
  });
});