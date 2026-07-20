import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack traces with named functions", () => {
    const stackLine = "at functionName (filename.js:42:24)";
    const result = Q.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["filename.js", 42]);
  });
});