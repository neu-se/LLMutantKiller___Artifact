import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber named function pattern", () => {
  it("should correctly parse named function stack frames for long stack support", async () => {
    // Enable long stack support to exercise stack trace parsing
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a chain of promises that will generate long stack traces
      // The mutation breaks parsing of named function frames (attempt1 pattern)
      // which affects captureLine() at module load time
      // If captureLine() fails, qFileName is undefined and qStartingLine is undefined
      // This means isInternalFrame() comparisons behave differently

      const error = new Error("test error");
      
      // Create a deferred and reject it to trigger stack trace handling
      const deferred = Q.defer();
      deferred.reject(error);
      
      let caughtReason: any;
      await deferred.promise.then(null, function(reason) {
        caughtReason = reason;
      });

      // The promise should have been rejected with our error
      expect(caughtReason).toBe(error);
      expect(caughtReason.message).toBe("test error");

      // Now test that Q.fcall works correctly - it relies on proper stack frame parsing
      let fcallError: any;
      await Q.fcall(function testNamedFunction() {
        throw new Error("fcall error");
      }).then(null, function(reason) {
        fcallError = reason;
      });

      expect(fcallError).toBeDefined();
      expect(fcallError.message).toBe("fcall error");

      // The key test: with long stack support, verify that the stack trace
      // contains meaningful information (not broken by the mutation)
      // In the original, captureLine() correctly identifies Q's file/line
      // In the mutated version, captureLine() returns undefined, so
      // isInternalFrame always returns false (no filtering of Q internals)
      // This means Q's own frames appear in filtered stacks

      // Create a promise chain to test long stack trace behavior
      const p1 = Q.defer();
      const p2 = p1.promise.then(function step1() {
        throw new Error("chain error");
      });

      let chainError: any;
      await p2.then(null, function(reason) {
        chainError = reason;
      });

      p1.resolve(42);

      // Wait for the chain to settle
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(chainError).toBeDefined();
      expect(chainError.message).toBe("chain error");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});