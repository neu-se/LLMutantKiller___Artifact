import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber named function frame parsing", () => {
  it("should filter Q internal frames from concatenated long stack traces", async () => {
    Q.longStackSupport = true;

    // Create a promise chain that will generate long stack traces
    // The error stack should have Q internal frames filtered out
    let capturedError: any = null;

    const p1 = Q.defer();
    
    const chain = p1.promise.then(() => {
      throw new Error("chain error");
    });

    p1.resolve(1);

    try {
      await chain;
    } catch (e) {
      capturedError = e;
    }

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    expect(capturedError.message).toBe("chain error");

    if (capturedError.stack) {
      // With original: Q internal frames filtered, stack is clean
      // With mutation: Q internal frames NOT filtered (qFileName undefined)
      // Check for Q internal function names that should be filtered
      const stack: string = capturedError.stack;
      const lines = stack.split("\n");
      
      // These are Q internal frame patterns that should be filtered
      const internalPatterns = [
        /\bat flush\b/,
        /\bat runSingle\b/,
        /\bat Promise\.promiseDispatch\b/,
        /\bat nextTick\b/,
      ];
      
      const hasInternalFrame = lines.some(line => 
        internalPatterns.some(pattern => pattern.test(line))
      );
      
      expect(hasInternalFrame).toBe(false);
    }
  });
});