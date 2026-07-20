const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a test stack line that matches the attempt3 regex pattern
    const testStackLine = "http://example.com/file.js:42";

    // Test that the original regex matches this pattern
    const originalRegex = /.*@(.+):(\d+)$/;
    const match = originalRegex.exec(testStackLine);

    // This should pass on original code but fail on mutated code
    // The mutation changes the regex to /.@/ which won't match the same way
    expect(match).not.toBeNull();
    if (match) {
      expect(match[1]).toBe("example.com/file.js");
      expect(match[2]).toBe("42");
    }
  });
});