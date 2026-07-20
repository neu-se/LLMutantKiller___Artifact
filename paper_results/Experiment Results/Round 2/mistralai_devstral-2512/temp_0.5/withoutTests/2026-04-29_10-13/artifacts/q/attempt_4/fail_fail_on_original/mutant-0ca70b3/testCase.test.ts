const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces by removing internal frames", () => {
    // Create a deep promise chain to generate multiple stack frames
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Deep error");
      });

    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      // The stack should contain our test file but not Q internal frames
      expect(error.stack).toContain("testCase.test.ts");
      expect(error.stack).not.toContain("q.js");
    });
  });
});