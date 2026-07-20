describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const error = new Error();
    error.stack = "at filename.js:123:456";
    const lines = error.stack.split("\n");
    const stackLine = lines[0];
    const originalRegex = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    const mutatedRegex = /at ([^ ]+):(\d+):(?:\d+)/.exec(stackLine);
    expect(originalRegex).not.toBeNull();
    expect(originalRegex[3]).toBe("456");
    expect(mutatedRegex).not.toBeNull();
    expect(mutatedRegex[3]).toBeUndefined();
  });
});