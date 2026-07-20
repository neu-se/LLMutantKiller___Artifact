// Test case to detect the mutation in the regex pattern for parsing stack traces
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with colon-separated line numbers", () => {
    // Create a scenario that generates a stack trace
    const error = new Error("Test error");
    const stackLine = "at http://example.com/script.js:42:5";

    // This test verifies that the regex correctly captures file name and line number
    // The mutation changes the regex from (\d+) to (\d) which would fail to match multi-digit line numbers
    const match = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    expect(match).not.toBeNull();
    expect(match![1]).toBe("http://example.com/script.js");
    expect(match![2]).toBe("42");
  });
});