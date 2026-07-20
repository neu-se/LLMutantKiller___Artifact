import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with longStackSupport", () => {
  it("should include previous event stacks in long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a promise chain that will be rejected
      // The key is that the promise needs a .source chain for makeStackTraceLong to walk
      const p1 = Q.defer();
      
      const result = p1.promise
        .then(function step1(value: unknown) {
          return value;
        })
        .then(function step2(value: unknown) {
          return value;
        })
        .then(function step3() {
          throw new Error("intentional error");
        });

      // Resolve the chain to trigger the rejection
      p1.resolve(42);

      await result.then(
        () => { /* fulfilled - shouldn't happen */ },
        (err: Error) => {
          capturedError = err;
        }
      );

      expect(capturedError).not.toBeNull();
      
      // In the original code, makeStackTraceLong walks the promise source chain
      // and concatenates stacks with "From previous event:" separator
      // In the mutated code (for loop condition is `false`), the loop never runs
      // so no previous stacks are appended
      const stack = (capturedError as Error).stack || "";
      
      // The "From previous event:" separator should appear in long stack traces
      // when the promise chain has been walked successfully
      expect(stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});