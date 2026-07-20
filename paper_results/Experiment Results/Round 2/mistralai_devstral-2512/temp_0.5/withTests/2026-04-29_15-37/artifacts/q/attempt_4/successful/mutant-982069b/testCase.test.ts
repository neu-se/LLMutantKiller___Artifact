const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString", () => {
  it("should filter out internal and node frames from stack traces", async () => {
    // Enable long stack traces to trigger the filterStackString function
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const deferred = Q.defer();
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // The stack should be filtered to remove internal Q frames
      const stack = e.stack;
      // Check that the stack trace contains expected content
      expect(stack).toContain("Test error");
      // Check that internal Q frames are filtered out
      expect(stack).not.toContain("filterStackString");
      expect(stack).not.toContain("makeStackTraceLong");
    }
  });
});