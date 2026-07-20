describe("Q library test", () => {
  it("should correctly parse stack line with column number", () => {
    const stackLine = "at foo (bar.js:10:20)";
    const originalCodeRegex = /at ([^ ]+):(\d+):(\d+)/;
    const mutatedCodeRegex = /at ([^ ]+):(\d+):(?:\d+)/;
    const originalMatch = originalCodeRegex.exec(stackLine);
    const mutatedMatch = mutatedCodeRegex.exec(stackLine);
    expect(originalMatch).toHaveLength(4);
    expect(mutatedMatch).toHaveLength(3);
  });
});