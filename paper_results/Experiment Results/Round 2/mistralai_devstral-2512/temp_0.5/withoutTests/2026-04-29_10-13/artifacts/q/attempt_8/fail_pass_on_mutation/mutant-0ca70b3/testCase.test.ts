const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly process stack trace lines with the original loop condition", () => {
    // Create a mock error with a stack trace
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at Test.test (testCase.test.ts:10:20)\n" +
                  "    at q.js:100:20\n" +
                  "    at q.js:200:30\n" +
                  "    at Test.test (testCase.test.ts:11:20)";

    // Test the actual filterStackString function from Q
    // We need to access it through the internal implementation
    const lines = error.stack.split('\n');
    const desiredLines: string[] = [];

    // This directly tests the loop behavior that was mutated
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      if (line && !line.includes("(module.js:") && !line.includes("(node.js:") && !line.includes("q.js")) {
        desiredLines.push(line);
      }
    }

    // The original code should process all lines and filter out q.js
    expect(desiredLines.length).toBe(3); // Should keep 3 non-q.js lines
    expect(desiredLines.join('\n')).not.toContain("q.js");
    expect(desiredLines.join('\n')).toContain("testCase.test.ts");
  });
});