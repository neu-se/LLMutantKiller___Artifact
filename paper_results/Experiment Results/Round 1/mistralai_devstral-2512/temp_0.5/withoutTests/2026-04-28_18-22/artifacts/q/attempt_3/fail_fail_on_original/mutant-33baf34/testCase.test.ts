import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly extract file name and line number from stack trace with named function", () => {
    const stackLine = "at functionName (/path/to/file.js:42:21)";
    const result = Q.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["/path/to/file.js", 42]);
  });
});