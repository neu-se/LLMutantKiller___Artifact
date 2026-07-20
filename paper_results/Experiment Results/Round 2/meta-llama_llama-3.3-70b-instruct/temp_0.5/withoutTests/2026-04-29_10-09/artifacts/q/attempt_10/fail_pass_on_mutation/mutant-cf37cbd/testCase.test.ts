describe("Q", () => {
  it("should correctly parse stack line", () => {
    const stackLine = "at file.js:10:2";
    const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    expect(attempt2).not.toBeNull();
    expect(attempt2[1]).toBe("file.js");
    expect(attempt2[2]).toBe("10");
    expect(attempt2[3]).toBe("2");
  });
});