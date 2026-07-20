const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", () => {
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        const stack = error.stack || "";
        // The mutation changes which lines are considered "internal" for filtering
        // Original: lineNumber >= qStartingLine (includes starting line)
        // Mutated: lineNumber > qStartingLine (excludes starting line)
        // This means the mutated version will filter out one less line
        // So the stack should be longer in the mutated version
        const lineCount = stack.split("\n").length;
        // Original should filter more lines, resulting in shorter stack
        expect(lineCount).toBeLessThanOrEqual(10);
      });
  });
});