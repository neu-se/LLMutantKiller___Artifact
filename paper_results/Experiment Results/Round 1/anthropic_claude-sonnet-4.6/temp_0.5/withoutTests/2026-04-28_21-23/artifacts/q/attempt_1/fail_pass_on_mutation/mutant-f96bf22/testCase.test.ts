import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should not include empty lines in filtered stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a chain that will produce a long stack trace
      const result = await Q.reject(new Error("test error"))
        .then(() => {
          // This won't run since we rejected
        })
        .fail((err: Error) => {
          capturedError = err;
          // Re-throw to propagate
          throw err;
        })
        .fail((err: Error) => {
          capturedError = err;
          return err;
        });

      if (capturedError !== null) {
        const err = capturedError as Error;
        if (err.stack) {
          const stackLines = err.stack.split("\n");
          // With the original code, empty lines are filtered out
          // With the mutated code (if (true)), empty lines are included
          const hasEmptyLine = stackLines.some((line: string) => line === "");
          
          // The original filterStackString filters out empty/falsy lines
          // The mutation removes this filter, so empty lines may appear
          // We verify the stack doesn't contain empty lines (original behavior)
          expect(hasEmptyLine).toBe(false);
        }
      }
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});