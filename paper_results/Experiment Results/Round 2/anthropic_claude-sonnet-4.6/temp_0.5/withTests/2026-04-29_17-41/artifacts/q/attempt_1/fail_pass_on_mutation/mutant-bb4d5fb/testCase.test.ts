import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces include user code frames", () => {
  it("should include user function names in long stack trace when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      function userDefinedFunction(): Promise<never> {
        return Q.reject(new Error("test error"));
      }

      let capturedError: Error | null = null;

      await Q.Promise<void>((resolve, reject) => {
        userDefinedFunction().then(resolve, (err: Error) => {
          capturedError = err;
          resolve(undefined);
        });
      });

      expect(capturedError).not.toBeNull();
      // The stack trace should include "userDefinedFunction" from this test file
      // With the mutation, frames from this file that happen to have line numbers
      // <= qEndingLine would be filtered out, potentially removing "userDefinedFunction"
      // from the stack trace
      const stack = (capturedError as Error).stack || "";
      expect(stack).toContain("userDefinedFunction");
    } finally {
      Q.longStackSupport = false;
    }
  });
});