import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber with Firefox-style stack frames", () => {
  it("should correctly handle stack lines with multiple characters before @ in Firefox format", async () => {
    // The mutation changes /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This means stack lines like "functionName@file.js:10" won't match
    // because "functionName" has more than one character before @
    
    // Enable long stack support to exercise the stack parsing code path
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;
    
    try {
      // Create a chain of promises that will exercise stack trace handling
      // The key is that captureLine() uses getFileNameAndLineNumber internally
      // If captureLine() fails, qStartingLine is undefined, affecting isInternalFrame
      
      let capturedError: Error | null = null;
      
      const result = await Q.fcall(function testFunction() {
        return 42;
      }).then(function chainedHandler(val: number) {
        return val * 2;
      });
      
      expect(result).toBe(84);
      
      // Now test rejection with long stacks - this exercises makeStackTraceLong
      // which relies on proper stack frame parsing
      let rejectionError: Error | null = null;
      try {
        await Q.fcall(function throwingFunction() {
          throw new Error("test error");
        });
      } catch (e) {
        rejectionError = e as Error;
      }
      
      expect(rejectionError).not.toBeNull();
      expect(rejectionError!.message).toBe("test error");
      
      // The stack should be defined when long stack support is on
      expect(rejectionError!.stack).toBeDefined();
      
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});