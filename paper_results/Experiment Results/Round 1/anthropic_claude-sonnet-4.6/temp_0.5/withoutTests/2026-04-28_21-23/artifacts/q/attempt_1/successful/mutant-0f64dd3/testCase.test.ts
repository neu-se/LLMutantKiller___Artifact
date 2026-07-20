import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine", () => {
  it("filters Q internal stack frames when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    let capturedError: Error | null = null;
    
    // Create the deferred AFTER enabling longStackSupport so promise.stack is set
    const deferred = Q.defer();
    
    const promise = deferred.promise.then(null, function(e: Error) {
      capturedError = e;
    });
    
    deferred.reject(new Error("test error"));
    
    await promise;
    
    Q.longStackSupport = false;
    
    expect(capturedError).not.toBeNull();
    expect(capturedError!.message).toBe("test error");
    
    // With original: filterStackString removes Q internal frames
    // With mutation: filterStackString doesn't remove Q internal frames
    // (because isInternalFrame always returns false when qFileName is undefined)
    
    if (capturedError!.stack) {
      const stack = capturedError!.stack;
      const STACK_JUMP_SEPARATOR = "From previous event:";
      
      // With longStackSupport, the stack should contain the separator
      // indicating that makeStackTraceLong was called
      // Both original and mutated should have this
      
      // The key difference: with original, Q internal lines are filtered
      // With mutation, they remain
      // We check that the stack doesn't contain q.js internal frames
      
      // After filtering, the stack should not contain lines pointing to q.js
      // (since those are internal frames)
      const lines = stack.split('\n');
      const qInternalLines = lines.filter(line => {
        // Look for lines that reference q.js but are not the test file
        return /\bq\.js\b/.test(line) && !/testCase/.test(line);
      });
      
      // Original: Q internal frames filtered out -> 0 q.js lines
      // Mutation: Q internal frames not filtered -> some q.js lines remain
      expect(qInternalLines.length).toBe(0);
    }
  });
});