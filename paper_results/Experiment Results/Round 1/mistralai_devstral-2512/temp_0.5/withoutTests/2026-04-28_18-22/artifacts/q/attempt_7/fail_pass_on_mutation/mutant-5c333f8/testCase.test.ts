const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should include the starting line in filtered stack traces", () => {
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        const stack = error.stack || "";
        const lines = stack.split("\n");

        // The mutation changes which lines are filtered
        // Original: >= includes starting line (filters it)
        // Mutated: > excludes starting line (keeps it)
        // So mutated version should have one more line
        expect(lines.length).toBe(14);
      });
  });
});