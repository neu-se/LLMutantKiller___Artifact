import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly parse the filename and line number from a stack line", () => {
    const stackLine = "at functionName (filename:123:45)";
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["filename", 123]);
  });
});