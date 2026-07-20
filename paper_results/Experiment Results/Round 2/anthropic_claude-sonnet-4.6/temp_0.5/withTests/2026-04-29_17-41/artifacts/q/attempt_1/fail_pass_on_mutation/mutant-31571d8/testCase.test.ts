import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple promise hops", () => {
  it("should include stack frames from earlier in the promise chain when an error propagates through multiple hops", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      function level3(): Q.Promise<never> {
        return Q.reject(new Error("original error"));
      }

      function level2(): Q.Promise<never> {
        return level3().then(function level2Handler() {
          // This won't be called, rejection propagates
          return Q.resolve(undefined) as any;
        });
      }

      function level1(): Q.Promise<never> {
        return level2().then(function level1Handler() {
          // This won't be called, rejection propagates
          return Q.resolve(undefined) as any;
        });
      }

      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        level1().then(null, function(err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      // The stack should contain "From previous event:" separator which indicates
      // that multiple promise hops were captured in the long stack trace.
      // In the original code, the condition `error.__minimumStackCounter__ > p.stackCounter`
      // allows stacks from earlier promises to be included.
      // In the mutated code (false), once __minimumStackCounter__ is set, no more stacks
      // are added, so the "From previous event:" separator may appear fewer times or not at all.
      const stack = capturedError!.stack || "";
      const separatorCount = (stack.match(/From previous event:/g) || []).length;
      // With multiple promise hops and long stack support, we expect at least one
      // "From previous event:" separator indicating chained stack traces
      expect(separatorCount).toBeGreaterThanOrEqual(1);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});