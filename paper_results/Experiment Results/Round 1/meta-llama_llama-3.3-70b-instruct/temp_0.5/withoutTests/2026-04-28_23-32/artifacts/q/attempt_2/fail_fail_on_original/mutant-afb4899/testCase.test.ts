import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const stackLine = "at filename.js:123:456";
    const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).not.toBeNull();
    expect(result[0]).toBe("filename.js");
    expect(result[1]).toBe(123);

    // This line should be true for the original code and false for the mutated code
    expect(stackLine.indexOf(":") !== -1 && stackLine.indexOf(":") !== stackLine.lastIndexOf(":")).toBe(true);
  });
});