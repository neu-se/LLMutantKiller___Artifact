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
});

// Helper function to get file name and line number from a stack line
function getFileNameAndLineNumber(stackLine: string) {
  // Named functions: "at functionName (filename:lineNumber:columnNumber)"
  // In IE10 function name can have spaces ("Anonymous function") O_o
  var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
  if (attempt1) {
    return [attempt1[1], Number(attempt1[2])];
  }

  // Attempt to parse without column number
  var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
  if (attempt2) {
    return [attempt2[1], Number(attempt2[2])];
  }

  // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
  var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
  if (attempt3) {
    return [attempt3[1], Number(attempt3[2])];
  }

  return null;
}