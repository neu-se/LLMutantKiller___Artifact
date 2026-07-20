import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString in long stack traces", () => {
  it("should exclude node internal frames from long stack traces", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;

      await new Promise<void>((resolve) => {
        function rejectingFunction() {
          const deferred = Q.defer();
          deferred.reject(new Error("test rejection"));
          return deferred.promise;
        }

        rejectingFunction()
          .then(function() {
            return Q.reject(new Error("chained rejection"));
          })
          .fail(function(err: any) {
            capturedError = err;
            resolve();
          });
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError.stack).toBeDefined();

      const stack: string = capturedError.stack;

      // In the original code: filterStackString keeps lines that are NOT internal frames
      // AND NOT node frames (module.js, node.js). So node-internal frames are excluded.
      // In the mutated code: filterStackString keeps lines that ARE node frames.
      // So the stack would consist ONLY of node-internal frames like (module.js:...) or (node.js:...)
      
      // The original stack should NOT contain node.js internal module frames
      // because filterStackString strips them out
      const nodeInternalFramePattern = /\(module\.js:\d+|\(node\.js:\d+/;
      expect(nodeInternalFramePattern.test(stack)).toBe(false);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});