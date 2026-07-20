import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const error = new Error();
    error.stack = "at filename.js:123:456";
    const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
    const result = getFileNameAndLineNumber(error.stack);
    expect(result).not.toBeNull();
    expect(result).toEqual(["filename.js", 123]);
    const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(error.stack);
    expect(attempt2).not.toBeNull();
    expect(attempt2[3]).toBe("456");
  });
});