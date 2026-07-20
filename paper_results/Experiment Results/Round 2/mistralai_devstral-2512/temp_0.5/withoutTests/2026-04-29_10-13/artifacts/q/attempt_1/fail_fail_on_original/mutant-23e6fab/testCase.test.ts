import { Q } from "./q";

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse Firefox-style stack traces", () => {
    const stackLine = "function@file.js:42";
    const result = Q.getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["file.js", 42]);
  });
});