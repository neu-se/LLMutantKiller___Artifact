import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should only include node internal frames in filtered stack traces, not all frames", async () => {
    Q.longStackSupport = true;

    try {
      const error = new Error("test error");
      
      // Create a chain that will produce a long stack trace
      const result = await Q.reject(error)
        .then(() => "should not reach here")
        .fail((err: Error) => {
          // With the mutation (isNodeFrame always returns true),
          // the filtered stack would include all non-internal frames.
          // With the original (isNodeFrame only matches node.js/module.js lines),
          // the filtered stack would be empty or contain only node internal lines.
          // 
          // The key observable difference: in the original code, filterStackString
          // removes all application-level stack frames (since they don't match
          // node.js: or module.js: patterns), leaving an empty string.
          // In the mutated code, all frames pass isNodeFrame, so the stack is preserved.
          return err.stack || "";
        });

      // In the original code, filterStackString strips out all non-node-internal frames
      // so the resulting stack should NOT contain application-level function names
      // like "Object.<anonymous>" or test file references.
      // In the mutated code, all frames are kept, so the stack would contain them.
      
      // The error.stack before filtering contains the test file path.
      // After filtering with original code: empty (no node.js:/module.js: lines in test stack)
      // After filtering with mutated code: contains the full stack
      
      // We verify the stack was actually modified/filtered by checking
      // that makeStackTraceLong ran (longStackSupport is on) and the
      // behavior differs between original and mutant.
      
      // With original: stack gets filtered to only node-internal lines -> likely empty or no test frames
      // With mutant: stack keeps all lines -> contains "test error" and test frames
      expect(typeof result).toBe("string");
      
      // The original filterStackString would produce an empty string for typical test stacks
      // (no lines match "(module.js:" or "(node.js:"), so the stack should be empty string
      // The mutant would produce a non-empty string with all frames
      expect(result).toBe("");
    } finally {
      Q.longStackSupport = false;
    }
  });
});