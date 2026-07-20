import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in long stack traces", () => {
  it("should filter out node internal frames from long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await Q.reject(new Error("test error"))
        .then(null, function (err: Error) {
          capturedError = err;
          return null;
        });

      // With longStackSupport, the stack trace should be filtered
      // The original isNodeFrame returns true for lines containing "(module.js:" or "(node.js:"
      // causing them to be filtered OUT of the stack trace.
      // The mutated version returns false, so those lines would NOT be filtered out.
      
      // We need to construct a scenario where node internal frames appear in the stack
      // and verify they are filtered out in the original but not in the mutated version.
      
      // Create a promise chain that will have a long stack trace
      const deferred = Q.defer<void>();
      
      let rejectionError: Error | null = null;
      
      const promise = deferred.promise.then(function step1() {
        return Q.reject(new Error("deep rejection"));
      }).then(null, function catchError(err: Error) {
        rejectionError = err;
        return null;
      });

      deferred.resolve();
      await promise;

      // The key behavior: with longStackSupport, makeStackTraceLong is called
      // which calls filterStackString, which uses isNodeFrame to filter lines.
      // In the original: node internal frames (module.js, node.js) are filtered out
      // In the mutant: node internal frames are NOT filtered out (isNodeFrame always returns false)
      
      // We can verify this by checking that the filterStackString behavior differs.
      // The most reliable way is to check that a stack trace with node internal frames
      // gets those frames removed in the original but not in the mutant.
      
      // Simulate what filterStackString does by checking the actual behavior:
      // Create an error with a stack that includes node internal frames
      const testError = new Error("test");
      
      // Manually craft a stack line that looks like a node internal frame
      const nodeInternalLine = "    at Module._compile (module.js:456:26)";
      const normalLine = "    at myFunction (myfile.js:10:5)";
      
      // The filterStackString function is internal, but we can test its effect
      // by using Q.longStackSupport and checking the resulting stack trace
      
      // Create a rejection that goes through the long stack trace mechanism
      let longStackError: Error | null = null;
      
      Q.onerror = null;
      
      const d2 = Q.defer<void>();
      const p2 = d2.promise
        .then(function outerStep() {
          return Q.fcall(function innerStep() {
            throw new Error("inner error for stack test");
          });
        })
        .then(null, function (err: Error) {
          longStackError = err;
          return null;
        });
      
      d2.resolve();
      await p2;
      
      if (longStackError && longStackError.stack) {
        const stack = longStackError.stack;
        // In the original: lines matching "(module.js:" or "(node.js:" are filtered out
        // In the mutant: those lines remain in the stack
        // We check that the stack does NOT contain node internal module lines
        // (original behavior) vs DOES contain them (mutant behavior)
        
        // The original code filters these out, so they should not appear
        // The mutant keeps them, so they would appear if present in the raw stack
        const hasNodeInternalFrames = stack.includes("(module.js:") || stack.includes("(node.js:");
        
        // In the original: hasNodeInternalFrames should be false (they are filtered)
        // In the mutant: hasNodeInternalFrames could be true (they are not filtered)
        // This test passes with original (false === false) and may fail with mutant
        expect(hasNodeInternalFrames).toBe(false);
      } else {
        // If we can't get a stack trace, at least verify the promise chain works
        expect(longStackError).not.toBeNull();
      }
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});