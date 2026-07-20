import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should preserve non-internal stack frames when building long stack traces", async () => {
    // Enable long stack support to trigger makeStackTraceLong -> filterStackString
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.Promise((resolve, reject) => {
        reject(new Error("test rejection"));
      }).then(() => {
        // This creates a chain that will invoke makeStackTraceLong
      });
    } catch (e) {
      capturedError = e as Error;
    } finally {
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    expect(capturedError!.stack).toBeDefined();
    // With the original code, filterStackString returns non-empty lines
    // With the mutated code, filterStackString returns empty string (no lines pushed)
    // The stack should contain at least some content from the error message
    expect(capturedError!.stack!.length).toBeGreaterThan(0);
    // More specifically, the stack should contain actual stack frame information
    // The mutated code would produce an empty string for the filtered stack
    expect(capturedError!.stack).toContain("test rejection");
  });
});