import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should properly filter internal frames from stack traces", () => {
    // Create an error with a stack trace that includes internal frames
    const error = new Error("Test error");
    const stackLines = [
      "Error: Test error",
      "    at Object.<anonymous> (test.js:10:15)",
      "    at Module._compile (module.js:456:26)",
      "    at Object.Module._extensions..js (module.js:474:10)",
      "    at Module.load (module.js:356:32)",
      "    at Function.Module._load (module.js:312:12)",
      "    at Function.Module.runMain (module.js:497:10)",
      "    at startup (node.js:119:16)",
      "    at node.js:902:3"
    ];

    // Mock the filterStackString function to test its behavior
    const filterStackString = (stackString: string): string => {
      const lines = stackString.split("\n");
      const desiredLines: string[] = [];
      for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        // This is the original condition that should filter out internal and node frames
        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
          desiredLines.push(line);
        }
      }
      return desiredLines.join("\n");
    };

    // Helper functions to identify frame types
    const isNodeFrame = (stackLine: string): boolean => {
      return stackLine.indexOf("(module.js:") !== -1 ||
             stackLine.indexOf("(node.js:") !== -1;
    };

    const isInternalFrame = (stackLine: string): boolean => {
      // For this test, we'll consider lines from q.js as internal
      return stackLine.indexOf("(q.js:") !== -1;
    };

    // Test the filtering
    const filteredStack = filterStackString(stackLines.join("\n"));
    const filteredLines = filteredStack.split("\n");

    // The original code should keep only the first line (the error message)
    // and filter out all internal and node frames
    expect(filteredLines.length).toBe(1);
    expect(filteredLines[0]).toBe("Error: Test error");
  });
});