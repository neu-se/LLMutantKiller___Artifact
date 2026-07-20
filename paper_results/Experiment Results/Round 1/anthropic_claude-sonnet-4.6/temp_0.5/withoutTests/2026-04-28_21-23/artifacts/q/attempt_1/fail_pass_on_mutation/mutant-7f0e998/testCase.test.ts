import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should preserve non-internal frames in stack traces when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      Q.reject(new Error("test error"))
        .then(null, function userRejectionHandler(err: Error) {
          capturedError = err;
          resolve();
          return null;
        });
    });

    expect(capturedError).not.toBeNull();
    
    if (capturedError && (capturedError as Error).stack) {
      const stack = (capturedError as Error).stack!;
      
      // With the original code, non-internal frames (user code) are preserved
      // With the mutated code, only internal Q frames are kept
      // The stack should contain the test file name (user code), not be empty or only Q internals
      
      // The stack should have meaningful content (not be stripped to nothing)
      expect(stack.length).toBeGreaterThan(0);
      
      // The original error message should be in the stack
      expect(stack).toContain("test error");
      
      // With original: user frames preserved, Q frames filtered out
      // With mutation: Q frames preserved, user frames filtered out
      // We check that the stack contains lines from this test file (user code)
      // which would be present in original but absent in mutated version
      const lines = stack.split("\n").filter(line => line.trim().length > 0);
      
      // The stack should contain at least the error message line
      // plus some stack frames from user code (this test file)
      const hasUserCodeFrame = lines.some(line => 
        line.includes("testCase.test") || 
        line.includes("Object.<anonymous>") ||
        line.includes("userRejectionHandler")
      );
      
      expect(hasUserCodeFrame).toBe(true);
    }

    Q.longStackSupport = false;
  });
});