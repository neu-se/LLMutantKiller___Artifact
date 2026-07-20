import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should preserve error stack trace when long stack support is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const error = new Error("test error");
      // Ensure the error has a stack
      expect(error.stack).toBeDefined();

      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        Q.reject(error)
          .then(null, function (err: Error) {
            capturedError = err;
            resolve();
          })
          .done();
      });

      expect(capturedError).not.toBeNull();
      // With the original code, filterStackString returns a string (possibly empty but defined)
      // With the mutated code, filterStackString returns undefined, so error.stack becomes undefined
      expect((capturedError as unknown as Error).stack).toBeDefined();
      expect(typeof (capturedError as unknown as Error).stack).toBe("string");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});