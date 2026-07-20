import { Q } from "./q";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack traces with function names", () => {
    const stackLine = "at functionName (filename.js:42:21)";
    const result = Q.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["filename.js", 42]);
  });
});