import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q library test", () => {
  it("should correctly parse stack line with column number", () => {
    const stackLine = "at foo (bar.js:10:20)";
    const error = new Error();
    error.stack = stackLine;

    const attempt2 = /at ([^ ]+):(\d+):(\d+)/;
    const match = attempt2.exec(stackLine);
    expect(match).not.toBeNull();
    expect(match[3]).toBe("20");
  });
});