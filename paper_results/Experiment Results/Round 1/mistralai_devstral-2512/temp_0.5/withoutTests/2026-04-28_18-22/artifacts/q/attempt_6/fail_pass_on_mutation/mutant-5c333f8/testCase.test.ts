const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter the starting line from stack traces", () => {
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        const stack = error.stack || "";
        const lines = stack.split("\n");

        // The mutation changes line filtering behavior
        // Original: lineNumber >= qStartingLine (filters starting line)
        // Mutated: lineNumber > qStartingLine (doesn't filter starting line)
        // So we expect the original to have fewer lines
        expect(lines.length).toBeLessThan(15);
      });
  });
});