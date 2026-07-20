describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const error = new Error();
    error.stack = "at filename.js:123:456";
    const lines = error.stack.split("\n");
    const stackLine = lines[0];
    const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    expect(attempt2).not.toBeNull();
    expect(attempt2[3]).toBe("456");
    const mutatedAttempt2 = /at ([^ ]+):(\d+):(?:\d+)/.exec(stackLine);
    expect(mutatedAttempt2).not.toBeNull();
    expect(mutatedAttempt2[3]).toBeUndefined();
  });
});