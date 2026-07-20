import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    const stackLine = "at functionName (filename.js:42:21)";
    const QInstance = Q();
    const result = QInstance.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["filename.js", 42]);
  });
});