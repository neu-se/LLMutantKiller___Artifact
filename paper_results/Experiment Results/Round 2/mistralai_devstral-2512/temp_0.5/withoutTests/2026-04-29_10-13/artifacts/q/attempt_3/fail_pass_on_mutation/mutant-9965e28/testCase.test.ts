const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise rejection tracking", () => {
  it("should track stack traces when available", () => {
    const errorWithStack = new Error("Test error");
    const promise = Q.reject(errorWithStack);

    // Force the promise to be handled to trigger untracking
    return promise.then(null, (reason: Error) => {
      // The mutation would cause this to fail because it would try to access
      // reason.stack when it's undefined (due to the mutated condition)
      expect(reason).toBe(errorWithStack);
      expect(reason.stack).toBeDefined();
    });
  });
});