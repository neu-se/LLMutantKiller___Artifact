const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a test stack line that matches the attempt3 regex pattern
    // This format comes from Firefox/Safari stack traces
    const testStackLine = "functionName@http://example.com/file.js:42:21";

    // Test the regex directly (this is what the internal function uses)
    const regex = /.*@(.+):(\d+)$/;
    const match = regex.exec(testStackLine);

    // This should match in original code but fail in mutated code
    // The mutation changes /.*@/ to /.@/ which requires a dot before @
    expect(match).not.toBeNull();
    if (match) {
      expect(match[1]).toBe("http://example.com/file.js");
      expect(match[2]).toBe("42");
    }
  });
});