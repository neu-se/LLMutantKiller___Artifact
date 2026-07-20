import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should preserve non-internal stack frames when building long stack traces", async () => {
    // Enable long stack support so makeStackTraceLong is called
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.reject(new Error("original error"))
        .then(() => {
          // This won't be called
        })
        .fail((err: Error) => {
          capturedError = err;
          // Re-throw to propagate
          throw err;
        })
        .then(null, (err: Error) => {
          capturedError = err;
        });
    } finally {
      Q.longStackSupport = false;
    }

    // The captured error should have a non-empty stack
    expect(capturedError).not.toBeNull();
    expect(capturedError!.stack).toBeDefined();
    // In the original code, filterStackString returns non-empty filtered lines
    // In the mutated code, filterStackString returns empty string (desiredLines is never populated)
    // So the stack should contain actual content (not be empty)
    expect(capturedError!.stack!.length).toBeGreaterThan(0);
    // The stack should contain the error message or some meaningful content
    expect(capturedError!.stack).toMatch(/Error|error/);
  });
});