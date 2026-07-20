const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should include the exact starting line in filtered stack traces", () => {
    let originalStack: string | undefined;
    return Q.resolve()
      .then(() => {
        // Create error at a known line to test filtering
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        originalStack = error.stack;
        // Now test with Q.reject to see filtering behavior
        return Q.reject(new Error("Q reject error"));
      })
      .catch((error: Error) => {
        const qStack = error.stack || "";
        const originalLines = originalStack?.split("\n") || [];
        const qLines = qStack.split("\n");

        // The mutation affects whether the starting line is included in filtering
        // Original: >= includes starting line (filters it out)
        // Mutated: > excludes starting line (doesn't filter it)
        // So mutated version should have one more line in stack
        expect(qLines.length).toBe(originalLines.length);
      });
  });
});