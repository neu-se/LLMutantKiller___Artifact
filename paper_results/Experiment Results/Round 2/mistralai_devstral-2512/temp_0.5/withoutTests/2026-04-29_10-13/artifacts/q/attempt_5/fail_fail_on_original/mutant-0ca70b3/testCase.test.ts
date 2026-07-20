const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces by removing internal frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deep promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => {
        return Q.resolve();
      })
      .then(() => {
        throw new Error("Deep error");
      });

    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      // The stack should contain our test file
      expect(error.stack).toContain("testCase.test.ts");
      // The stack should not contain Q internal frames when filtered
      const filteredStack = Q.filterStackString(error.stack);
      expect(filteredStack).not.toContain("q.js");
    });
  });
});