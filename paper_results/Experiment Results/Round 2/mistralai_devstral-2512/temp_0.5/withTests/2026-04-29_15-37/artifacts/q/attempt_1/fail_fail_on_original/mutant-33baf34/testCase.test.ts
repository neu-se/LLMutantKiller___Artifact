import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
  it("should correctly extract file name and line number from named function stack line", () => {
    const stackLine = "at functionName (/path/to/file.js:42:24)";
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["/path/to/file.js", 42]);
  });
});