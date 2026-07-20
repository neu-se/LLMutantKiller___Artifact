const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter Node.js stack frames from error stacks", async () => {
    // Create a rejected promise that will generate a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    // Get the promise and force long stack traces
    Q.longStackSupport = true;
    const promise = deferred.promise;

    try {
      await promise;
    } catch (error: any) {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // Create a mock stack line that should be filtered
      const mockStack = error.stack + "\nat Module._compile (module.js:123:45)\n";
      error.stack = mockStack;

      // Force re-filtering by creating a new error with the modified stack
      const newError = new Error("Test error");
      newError.stack = mockStack;

      // The filtered stack should not contain Node.js internal frames
      const filteredStack = Q.getUnhandledReasons()[0].filterStackString(newError.stack);
      expect(filteredStack).not.toContain("(module.js:");
      expect(filteredStack).not.toContain("(node.js:");
    }
  });
});