const q = require('./q.js');

describe("Q", () => {
  it("should correctly parse the stack line with a line number", () => {
    const getFileNameAndLineNumber = q.getFileNameAndLineNumber;
    const stackLine = "at foo@/path/to/file.js:123";
    const result = getFileNameAndLineNumber(stackLine);
    expect(result[1]).toBe(123);
  });

  it("should not parse the stack line with a non-numeric line number", () => {
    const getFileNameAndLineNumber = q.getFileNameAndLineNumber;
    const stackLine = "at foo@/path/to/file.js:abc";
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).toBe(false);
  });
});