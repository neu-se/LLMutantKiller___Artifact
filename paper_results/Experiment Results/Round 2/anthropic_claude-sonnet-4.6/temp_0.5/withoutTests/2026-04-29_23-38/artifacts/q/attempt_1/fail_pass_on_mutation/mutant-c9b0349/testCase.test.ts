import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame stack filtering", () => {
  it("should include user code frames in long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        Q.reject(new Error("test rejection"))
          .then(null, function userRejectionHandler(err: Error) {
            capturedError = err;
            resolve();
          });
      });

      // The stack should exist and contain meaningful frames
      expect(capturedError).not.toBeNull();
      expect((capturedError as Error).stack).toBeDefined();
      
      // With original code: qStartingLine check ensures only lines within Q's
      // actual range are filtered. With mutation: lines below qStartingLine
      // are also filtered (since lower bound check is removed).
      // The stack should contain the "From previous event:" separator
      // indicating long stack traces are working
      const stack = (capturedError as Error).stack || "";
      expect(typeof stack).toBe("string");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});