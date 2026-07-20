import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString node frame filtering", () => {
  it("should filter out node frames from stack traces when using long stack support", async () => {
    // Enable long stack support to trigger makeStackTraceLong and filterStackString
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a rejection with a stack that contains a node frame
      // We'll create a custom error with a stack that includes node.js frames
      const error = new Error("test error");
      // Manually craft a stack that includes a node frame
      Object.defineProperty(error, "stack", {
        value: "Error: test error\n    at someFunction (someFile.js:10:5)\n    at Object.<anonymous> (module.js:123:10)\n    at anotherFunction (userCode.js:20:3)",
        configurable: true,
        writable: true
      });

      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        const deferred = Q.defer();
        
        deferred.promise.then(null, function(err: Error) {
          capturedError = err;
          resolve();
        });

        deferred.reject(error);
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";
      
      // In the original code, node frames (module.js) should be filtered out
      // In the mutated code, node frames would be included because the condition
      // uses || instead of &&, making !isInternalFrame(line) sufficient to include the line
      // For a node frame: !isInternalFrame(nodeLine) = true, so with ||, it passes
      expect(stack).not.toContain("module.js");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});