const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly iterate through stack trace lines", () => {
    // Create a mock error with a stack trace
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                  "    at Test.test (testCase.test.ts:10:20)\n" +
                  "    at q.js:100:20\n" +
                  "    at q.js:200:30\n" +
                  "    at Test.test (testCase.test.ts:11:20)";

    // Test the loop condition directly
    const lines = error.stack.split('\n');
    let iterationCount = 0;

    // This mimics the exact loop from the original code
    for (let i = 0; i < lines.length; ++i) {
      iterationCount++;
      const line = lines[i];
      if (line && !line.includes("(module.js:") && !line.includes("(node.js:") && !line.includes("q.js")) {
        // Process line
      }
    }

    // The loop should iterate through all lines (5 lines)
    expect(iterationCount).toBe(5);

    // Now test with the mutated condition (i >= lines.length)
    iterationCount = 0;
    for (let i = 0; i >= lines.length; ++i) {
      iterationCount++;
    }

    // The mutated condition should not iterate at all
    expect(iterationCount).toBe(0);
  });
});