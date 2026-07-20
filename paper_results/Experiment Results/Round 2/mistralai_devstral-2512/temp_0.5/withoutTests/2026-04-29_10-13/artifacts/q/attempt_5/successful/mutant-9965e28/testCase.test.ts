const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise rejection tracking", () => {
  it("should track unhandled rejection reasons with stack traces", () => {
    // Create an error with a stack trace
    const errorWithStack = new Error("Test error");
    const promise = Q.reject(errorWithStack);

    // Get the unhandled reasons before handling
    const reasonsBefore = Q.getUnhandledReasons();
    expect(reasonsBefore.length).toBe(1);
    expect(reasonsBefore[0]).toContain(errorWithStack.stack);

    // Handle the promise
    return promise.then(null, (reason) => {
      expect(reason).toBe(errorWithStack);
      // After handling, the reason should be removed
      const reasonsAfter = Q.getUnhandledReasons();
      expect(reasonsAfter.length).toBe(0);
    });
  });
});