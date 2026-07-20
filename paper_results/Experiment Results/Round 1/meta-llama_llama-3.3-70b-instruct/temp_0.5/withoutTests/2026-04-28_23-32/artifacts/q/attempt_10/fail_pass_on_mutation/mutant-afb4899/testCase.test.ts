describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const error = new Error();
    error.stack = "at filename.js:123:456";
    const lines = error.stack.split("\n");
    const stackLine = lines[0];
    const getFileNameAndLineNumber = function(stackLine) {
      var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
      if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
      }

      var attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
      if (attempt2) {
        return [attempt2[1], Number(attempt2[2]), Number(attempt2[3])];
      }

      var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
      if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
      }
      return null;
    };
    const result = getFileNameAndLineNumber(error.stack);
    expect(result).not.toBeNull();
    expect(result.length).toBe(3);
    expect(result[2]).toBe(456);
  });
});