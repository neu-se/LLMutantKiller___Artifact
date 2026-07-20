const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames including the starting line", () => {
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        const stack = error.stack || "";
        const lines = stack.split("\n");

        // The mutation changes which lines are considered internal
        // Original: >= includes starting line (filters it)
        // Mutated: > excludes starting line (doesn't filter it)
        // So we check for a specific internal frame that should be filtered
        const hasInternalFrame = lines.some(line =>
          line.includes("q.js") && !line.includes("Test error")
        );
        expect(hasInternalFrame).toBe(false);
      });
  });
});