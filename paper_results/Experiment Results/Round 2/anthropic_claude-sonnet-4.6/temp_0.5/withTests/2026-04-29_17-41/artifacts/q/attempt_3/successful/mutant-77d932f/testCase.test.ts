import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("enables proper stack filtering so Q internal frames are removed from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | undefined;

      // We need a scenario where promise.stack contains Q internal frames
      // and those frames get filtered (original) or not filtered (mutated)
      
      await new Promise<void>((resolve) => {
        // Q.defer() captures the stack - this stack contains "defer" from q.js
        const d = Q.defer<void>();
        
        d.promise.then(function () {
          throw new Error("test");
        }).fail(function (err: Error) {
          capturedError = err;
          resolve();
        });
        
        d.resolve();
      });

      expect(capturedError).toBeDefined();
      const stack = capturedError!.stack!;
      
      // Verify long stack trace was built
      expect(stack).toContain("From previous event:");
      
      const afterSeparator = stack.split("From previous event:")[1] || "";
      const lines = afterSeparator.split("\n").filter(l => l.trim() !== "");
      
      // In the original: Q internal frames (from q.js) are filtered by isInternalFrame
      // In the mutated: Q internal frames are NOT filtered (isInternalFrame always false)
      // 
      // The "From previous event:" section comes from d.promise.stack which was
      // captured when Q.defer() was called. That stack contains:
      //   - "at defer (/.../q.js:NNN:NN)" 
      //   - "at Object.defer (/.../q.js:NNN:NN)" or similar
      //   - user code frame
      //
      // Original: only user code frame remains after filtering
      // Mutated: all frames including q.js ones remain
      //
      // We can check the line count: original should have fewer lines
      // OR check for absence of q.js-specific content
      
      // Check that none of the lines in the "From previous event:" section
      // reference the defer function from q.js
      const hasInternalFrames = lines.some(line => 
        line.includes("q.js") || line.match(/at defer /)
      );
      
      expect(hasInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});