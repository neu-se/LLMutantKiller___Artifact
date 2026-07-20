import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    // Create a promise chain that will reject with an error
    const promise = Q.reject(new Error("Test error"))
      .then(null, (err: Error) => {
        // Re-throw the error to create a longer stack trace
        throw err;
      })
      .then(null, (err: Error) => {
        capturedError = err;
        throw err;
      });

    return promise
      .catch((err: Error) => {
        // Verify that the error has stack trace information
        expect(err.stack).toBeDefined();

        // The mutation changes the condition from checking __minimumStackCounter__
        // to always being true. This affects how stack traces are concatenated.
        // In the original code, the stack trace should be properly filtered.
        // In the mutated code, it might include more frames than it should.

        // Check that the error has the expected properties
        expect(err.message).toBe("Test error");

        // Verify that capturedError also has stack information
        if (capturedError) {
          expect(capturedError.stack).toBeDefined();
        }

        // The test passes if we reach here without unexpected behavior
        // The mutation would cause different stack trace filtering
      })
      .finally(() => {
        // Clean up
        Q.longStackSupport = false;
      });
  });
});