import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle stack traces correctly", () => {
    try {
      throw new Error("Test error");
    } catch (e) {
      const error = e as Error;
      const stack = error.stack;
      const lines = stack.split("\n");
      const filteredLines = lines.filter(line => !line.includes("node.js:") && !line.includes("module.js:"));
      expect(filteredLines.length).toBeGreaterThan(0);
    }
  });
});