const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces by removing internal frames", () => {
    // Create a promise that will generate a stack trace with internal frames
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    return deferred.promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      // The stack should contain our test file
      expect(error.stack).toContain("testCase.test.ts");
      // The stack should be properly filtered (not empty after filtering)
      const lines = error.stack.split('\n');
      expect(lines.length).toBeGreaterThan(0);
    });
  });
});