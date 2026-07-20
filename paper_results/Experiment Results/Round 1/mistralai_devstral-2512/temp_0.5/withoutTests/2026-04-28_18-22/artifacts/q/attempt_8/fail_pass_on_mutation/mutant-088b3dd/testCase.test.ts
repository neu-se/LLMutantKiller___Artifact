const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise rejection", () => {
  it("should properly handle promise rejection with stack traces", () => {
    const deferred = Q.defer();
    const error = new Error("Test rejection");

    // Create a promise chain that will reject
    deferred.promise.then(() => {
      throw error;
    }).catch((e) => {
      // The stack trace should be properly parsed
      expect(e.stack).toBeDefined();
      expect(e.stack).toContain("Test rejection");
    });

    // Trigger the rejection
    deferred.reject(error);
  });
});