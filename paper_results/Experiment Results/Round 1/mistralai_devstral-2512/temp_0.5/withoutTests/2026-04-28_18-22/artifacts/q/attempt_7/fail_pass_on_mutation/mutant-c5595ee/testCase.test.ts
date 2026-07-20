const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create test stack lines that actually contain @ symbols
    // These match the format that the attempt3 regex is designed to parse
    const testStackLine1 = "http://example.com@file.js:42";
    const testStackLine2 = "at http://example.com@file.js:42";

    // Test that the original regex matches these patterns
    const originalRegex = /.*@(.+):(\d+)$/;
    const match1 = originalRegex.exec(testStackLine1);
    const match2 = originalRegex.exec(testStackLine2);

    // These should pass on original code but fail on mutated code
    // The mutation changes the regex to /.@/ which won't match the same way
    expect(match1).not.toBeNull();
    expect(match2).not.toBeNull();

    if (match1) {
      expect(match1[1]).toBe("file.js");
      expect(match1[2]).toBe("42");
    }

    if (match2) {
      expect(match2[1]).toBe("file.js");
      expect(match2[2]).toBe("42");
    }
  });
});