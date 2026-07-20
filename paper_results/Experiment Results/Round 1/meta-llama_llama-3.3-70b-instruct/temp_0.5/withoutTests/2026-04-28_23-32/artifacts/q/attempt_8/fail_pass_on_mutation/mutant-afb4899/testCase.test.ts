describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const error = new Error();
    error.stack = "at filename.js:123:456";
    const lines = error.stack.split("\n");
    const stackLine = lines[0];
    const regex = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    expect(regex).not.toBeNull();
    expect(regex[3]).toBe("456");
  });
});