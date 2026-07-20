describe("Q", () => {
  it("should correctly parse stack line", () => {
    const stackLine = "at file.js:10:20";
    const attempt2Original = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    expect(attempt2Original).not.toBeNull();
    expect(attempt2Original[1]).toBe("file.js");
    expect(attempt2Original[2]).toBe("10");
    expect(attempt2Original[3]).toBe("20");
    const attempt2Mutated = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
    expect(attempt2Mutated).toBeNull();
  });
});