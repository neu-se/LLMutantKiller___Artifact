const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter the starting line from stack traces", () => {
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        const stack = error.stack || "";
        const lines = stack.split("\n");

        // The mutation changes line filtering behavior
        // Original: lineNumber >= qStartingLine (includes starting line in filter)
        // Mutated: lineNumber > qStartingLine (excludes starting line from filter)
        // This means the original should have exactly one fewer line
        expect(lines.length).toBe(14);
      });
  });
});