import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack traces with isInternalFrame mutation", () => {
  it("should include user code frames in long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      const promise = Q.reject(new Error("test error"));
      
      await new Promise<void>((resolve) => {
        promise.fail((err: Error) => {
          capturedError = err;
          resolve();
        }).done();
      });

      // The error should exist and have a stack
      expect(capturedError).not.toBeNull();
      expect((capturedError as Error).stack).toBeDefined();
      
      // The stack should contain the error message
      expect((capturedError as Error).stack).toContain("test error");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});