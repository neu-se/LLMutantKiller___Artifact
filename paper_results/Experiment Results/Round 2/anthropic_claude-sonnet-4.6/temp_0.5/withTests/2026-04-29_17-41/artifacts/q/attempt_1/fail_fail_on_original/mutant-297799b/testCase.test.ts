import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior via long stack traces", () => {
  it("should filter stack traces to only include node internal frames, not arbitrary user frames", async () => {
    Q.longStackSupport = true;

    try {
      function userFunction() {
        return Q.reject(new Error("test error"));
      }

      let capturedError: Error | null = null;

      await userFunction().then(null, function(err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const error = capturedError as unknown as Error;

      // With the original code, filterStackString only keeps lines matching
      // "(module.js:" or "(node.js:" patterns. User function frames like
      // "userFunction" would NOT appear in the filtered stack.
      // With the mutation (return true), ALL non-internal frames are kept,
      // so "userFunction" WOULD appear in the filtered stack.
      //
      // We verify that the stack does NOT contain "userFunction" after filtering,
      // which is the behavior of the original code.
      // The mutation would cause "userFunction" to appear in the stack.
      
      // Actually, makeStackTraceLong modifies error.stack only if promise.stack exists
      // Let's check the actual stack content after long stack trace processing
      
      // The key insight: with original code, filterStackString returns only lines
      // with "(module.js:" or "(node.js:" - so a filtered stack would be mostly empty
      // or contain only node internals. With mutation, it returns all non-internal lines.
      
      // We can check that the error stack after processing doesn't contain
      // typical user-land frame indicators that would only be preserved by the mutation
      if (error.stack) {
        // With original: filterStackString strips out non-node-internal lines
        // The filtered stack should NOT contain lines from user code like "Object.<anonymous>"
        // that don't match "(module.js:" or "(node.js:"
        // With mutation: these lines ARE kept
        
        // Count lines that look like typical test/user frames (not node internals)
        const lines = error.stack.split("\n");
        const userFrameLines = lines.filter(line => 
          line.includes("at ") && 
          !line.includes("(module.js:") && 
          !line.includes("(node.js:") &&
          line.trim().length > 0
        );
        
        // With original code: filterStackString removes user frames, so there should be 0
        // With mutation: filterStackString keeps user frames, so there would be > 0
        expect(userFrameLines.length).toBe(0);
      }
    } finally {
      Q.longStackSupport = false;
    }
  });
});