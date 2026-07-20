const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should not filter non-Q frames from stack traces", async () => {
    // Create an error with a stack trace that includes non-Q frames
    function outerFunction() {
      function innerFunction() {
        throw new Error("Test error");
      }
      innerFunction();
    }

    const error = new Error();
    Error.captureStackTrace(error, outerFunction);
    const deferred = Q.defer();
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // In original code: non-Q frames should remain
      // In mutated code: all frames filtered out (isInternalFrame returns true)
      expect(e.stack).toContain("outerFunction");
      expect(e.stack).toContain("innerFunction");
    }
  });
});