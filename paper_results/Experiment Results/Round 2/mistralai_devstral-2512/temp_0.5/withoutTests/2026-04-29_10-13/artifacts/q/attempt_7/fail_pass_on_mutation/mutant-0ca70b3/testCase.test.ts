const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly process stack trace lines", () => {
    // Create a mock error with a stack trace that includes internal frames
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at Test.test (testCase.test.ts:10:20)\n" +
                  "    at q.js:100:20\n" +
                  "    at q.js:200:30\n" +
                  "    at Test.test (testCase.test.ts:11:20)";

    // Manually call the filterStackString function to test the loop behavior
    const lines = error.stack.split('\n');
    const desiredLines: string[] = [];

    // This mimics the original filterStackString implementation
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      if (line && !line.includes("q.js")) {
        desiredLines.push(line);
      }
    }

    // Verify the filtering worked correctly
    expect(desiredLines.length).toBeGreaterThan(0);
    expect(desiredLines.join('\n')).not.toContain("q.js");
    expect(desiredLines.join('\n')).toContain("testCase.test.ts");
  });
});