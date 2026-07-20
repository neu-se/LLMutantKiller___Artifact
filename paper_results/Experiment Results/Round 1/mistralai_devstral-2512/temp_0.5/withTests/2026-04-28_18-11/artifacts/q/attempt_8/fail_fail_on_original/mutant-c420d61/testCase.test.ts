// Test case to detect the mutation in the isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly identify Node.js stack frames", () => {
    // Create a mock stack line that should be identified as a Node.js frame
    const nodeStackLine = "    at Module._compile (node.js:123:45)";

    // Test the isNodeFrame function directly by checking if it filters this line
    // We'll use the internal filterStackString function which calls isNodeFrame
    const testError = new Error("Test");
    testError.stack = `Error: Test\n${nodeStackLine}\n    at someOtherFunction (test.js:10:5)`;

    // Use Q's internal stack filtering
    const filteredStack = Q._filterStackString(testError.stack);

    // In the original code, Node.js frames should be filtered out
    // In the mutated code, the function always returns false, so filtering won't work
    expect(filteredStack).not.toContain(nodeStackLine);
  });
});