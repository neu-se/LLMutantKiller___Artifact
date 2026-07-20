const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should handle long stack traces correctly", () => {
    const Q = qModule;
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create a rejection with stack trace
    deferred.reject(new Error("Test error"));

    return promise.then(() => {
      expect(true).toBe(false); // Should not reach here
    }).catch((error: Error) => {
      // Verify stack trace contains valid line information
      expect(error.stack).toBeDefined();
      const lines = error.stack!.split("\n");
      const hasValidLines = lines.some(line =>
        line.includes(".js:") && !line.includes("node.js:") && !line.includes("module.js:")
      );
      expect(hasValidLines).toBe(true);
    });
  });
});