// Import the Q library
import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q library test", () => {
  it("should correctly parse stack line with column number", () => {
    const stackLine = "at foo (bar.js:10:20)";
    const error = new Error();
    error.stack = stackLine;

    const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    expect(fileNameAndLineNumber).toEqual(["bar.js", 10]);
  });

  function getFileNameAndLineNumber(stackLine: string) {
    var attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    if (attempt2) {
      return [attempt2[1], Number(attempt2[2])];
    }
    return null;
  }
});