import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString in long stack traces", () => {
  it("preserves the error message line in filtered long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;

      await new Promise<void>((resolve) => {
        Q.reject(new Error("sentinel error message"))
          .fail(function(err: any) {
            capturedError = err;
            resolve();
          });
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack;
      expect(stack).toBeDefined();
      // The error message line itself is not an "at" frame, not a node frame,
      // not an internal frame - it should survive in original but be dropped in mutant
      // since it doesn't match isNodeFrame pattern
      expect(stack).toContain("sentinel error message");
    } finally {
      Q.longStackSupport = false;
    }
  });
});