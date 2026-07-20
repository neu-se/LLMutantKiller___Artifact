import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in long stack traces", () => {
  it("should filter out Node.js internal frames from error stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        Q.reject(new Error("test error"))
          .then(() => {
            // should not reach here
          })
          .fail((err: Error) => {
            capturedError = err;
            resolve();
          })
          .done();
      });

      // Give Q time to process
      await new Promise<void>((resolve) => setTimeout(resolve, 50));

      if (capturedError !== null) {
        const stack = (capturedError as Error).stack || "";
        // In the original code, isNodeFrame filters out lines containing "(module.js:" and "(node.js:"
        // With the mutation (always returning false), these lines would NOT be filtered
        // We verify that the filtered stack does not contain Node.js internal frames
        expect(stack).not.toMatch(/\(module\.js:/);
        expect(stack).not.toMatch(/\(node\.js:/);
      }
    } finally {
      Q.longStackSupport = false;
    }

    // More direct test: use filterStackString indirectly via long stack traces
    // Create a scenario where we can observe the filtering behavior
    Q.longStackSupport = true;

    try {
      const stackLines: string[] = [];
      
      // Manually test by creating an error with a known stack containing node frames
      // and verifying the Q promise chain filters them
      const deferred = Q.defer();
      
      let resolvedStack = "";
      
      const promise = deferred.promise.then(() => {
        throw new Error("inner error");
      }).fail((err: Error) => {
        resolvedStack = err.stack || "";
        return null;
      });

      deferred.resolve(null);
      
      await promise;
      
      // The stack should not contain Node.js internal module frames
      // Original: isNodeFrame returns true for these, so they get filtered
      // Mutant: isNodeFrame returns false, so they would NOT be filtered
      expect(resolvedStack).not.toMatch(/\(module\.js:\d+/);
      expect(resolvedStack).not.toMatch(/\(node\.js:\d+/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});