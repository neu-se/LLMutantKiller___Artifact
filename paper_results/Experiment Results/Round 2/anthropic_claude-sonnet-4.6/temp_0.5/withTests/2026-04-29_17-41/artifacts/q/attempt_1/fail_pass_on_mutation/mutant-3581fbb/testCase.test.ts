import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior in long stack traces", () => {
  it("should preserve user code frames (non-node-internal) in long stack traces", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;

      await new Promise<void>((resolve) => {
        function userFunction() {
          return Q.reject(new Error("test error from user code"));
        }

        userFunction()
          .fail(function(err: any) {
            capturedError = err;
            resolve();
          });
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError.stack).toBeDefined();

      // The stack trace should contain lines from user code (this test file)
      // In the original code: non-internal, non-node frames are kept
      // In the mutated code: only node frames (module.js, node.js) are kept
      // So the stack should contain references to this test file or userFunction
      const stack: string = capturedError.stack;

      // The stack should contain the error message
      expect(stack).toContain("test error from user code");

      // The stack should contain frames from user code (not just node internals)
      // A typical user frame would reference the test file path or function names
      // In the original: user frames are preserved
      // In the mutated: user frames are stripped, leaving only node internal frames
      const lines = stack.split("\n").filter((line: string) => line.trim().length > 0);
      
      // There should be multiple lines in the stack (error message + at least some frames)
      // With the mutation, only node-internal frames survive, so lines referencing
      // user code (like this test file) would be absent
      const hasUserCodeFrame = lines.some((line: string) => 
        line.includes("testCase.test") || 
        line.includes("userFunction") ||
        line.includes("Object.<anonymous>") ||
        // Any frame that is NOT a node internal frame
        (line.includes("at ") && !line.includes("(module.js:") && !line.includes("(node.js:") && !line.includes("node_modules"))
      );

      expect(hasUserCodeFrame).toBe(true);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});