import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering with multi-digit line numbers", () => {
  it("filters Q-internal frames from error stacks so q.js lines are not present", async () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      // The deferred promise will have a .stack property captured inside q.js
      // (at a multi-digit line number, since q.js is hundreds of lines long)
      
      deferred.reject(new Error("test rejection"));

      let capturedError: Error | null = null;
      await deferred.promise.then(null, (e: Error) => {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";

      // With original regex (\d+): captureLine() parses multi-digit line numbers correctly,
      // qStartingLine/qEndingLine are set, isInternalFrame() works, q.js lines are filtered OUT.
      // Result: stack does NOT contain "q.js:" references.
      //
      // With mutated regex (\d): captureLine() fails on multi-digit line numbers,
      // qStartingLine is undefined, isInternalFrame() always returns false,
      // q.js lines are NOT filtered.
      // Result: stack DOES contain "q.js:" references.
      expect(stack).not.toMatch(/q\.js:\d/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});