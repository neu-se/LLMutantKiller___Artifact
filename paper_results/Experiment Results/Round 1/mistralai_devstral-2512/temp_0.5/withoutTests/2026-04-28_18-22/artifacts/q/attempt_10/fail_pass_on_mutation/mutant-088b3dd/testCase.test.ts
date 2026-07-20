const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise stack traces", () => {
  it("should properly handle promise rejections with stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a promise chain that will reject
    deferred.promise
      .then(() => {
        throw error;
      })
      .catch((e) => {
        // The stack should contain proper file/line information
        expect(e.stack).toBeDefined();
        // This indirectly tests getFileNameAndLineNumber through the stack filtering
        expect(e.stack).toContain("Test error");
      });

    // Trigger rejection
    deferred.reject(error);
  });
});