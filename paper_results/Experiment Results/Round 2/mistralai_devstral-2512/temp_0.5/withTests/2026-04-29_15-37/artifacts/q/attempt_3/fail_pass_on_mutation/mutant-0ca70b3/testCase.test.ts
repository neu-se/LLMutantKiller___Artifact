const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should correctly filter stack traces", () => {
    // Create a test that will generate a stack trace and trigger the filterStackString function
    const deferred = Q.defer();
    const error = new Error("Test error");

    // This will cause the stack trace to be filtered
    Q.longStackSupport = true;
    deferred.reject(error);

    return deferred.promise.catch((e: Error) => {
      // The stack trace should be filtered and not empty
      expect(e.stack).not.toBe("");
      expect(e.stack).not.toContain("filterStackString");
    });
  });
});