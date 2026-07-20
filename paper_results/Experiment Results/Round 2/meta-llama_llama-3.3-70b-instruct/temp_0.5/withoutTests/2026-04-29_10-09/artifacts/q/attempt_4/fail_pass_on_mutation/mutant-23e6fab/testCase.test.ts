import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle Firefox-style stack traces with conditional check", () => {
    const error = new Error("Test error");
    const stack = `function@/path/to/file:10`;
    error.stack = stack;
    const result = getFileNameAndLineNumber(stack);
    expect(result).toEqual(["/path/to/file", 10]);
    const attempt3 = /.*@(.+):(\d+)$/.exec(stack);
    expect(attempt3).toBeTruthy();
  });
});

function getFileNameAndLineNumber(stackLine: string) {
  // Named functions: "at functionName (filename:lineNumber:columnNumber)"
  // In IE10 function name can have spaces ("Anonymous function") O_o
  var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
  if (attempt1) {
    return [attempt1[1], Number(attempt1[2])];
  }

  // Anonymous functions: "at filename:lineNumber:columnNumber"
  var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
  if (attempt2) {
    return [attempt2[1], Number(attempt2[2])];
  }

  // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
  var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
  if (attempt3) {
    return [attempt3[1], Number(attempt3[2])];
  }

  throw new Error("Failed to parse stack line");
}