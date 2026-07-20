import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a mock stack line that matches the pattern for named functions
    const stackLine = "at functionName (/path/to/file.js:42:21)";
    // The original code should return ["/path/to/file.js", 42]
    // The mutated code will return undefined because it doesn't return anything
    const result = q.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["/path/to/file.js", 42]);
  });
});