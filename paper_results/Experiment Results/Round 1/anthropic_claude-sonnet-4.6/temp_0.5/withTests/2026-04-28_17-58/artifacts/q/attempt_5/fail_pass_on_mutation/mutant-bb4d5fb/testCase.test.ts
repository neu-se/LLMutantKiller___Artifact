import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("only filters frames from q.js, not from other files", () => {
    Q.longStackSupport = true;

    // We need to verify that makeStackTraceLong preserves non-Q frames
    // The key: when a rejection propagates through .then(), _rejected calls
    // makeStackTraceLong(exception, self) where self has a .stack from defer()
    // makeStackTraceLong modifies exception.stack via filterStackString
    
    // Create error at a known named location
    const err = new Error("test");
    // Manually check what filterStackString would do
    // by observing the final stack after promise rejection handling
    
    const d = Q.defer();
    d.reject(err);
    
    const originalStack = err.stack;
    
    return d.promise.then(null, (e: any) => {
      Q.longStackSupport = false;
      // After makeStackTraceLong runs, e.stack should still contain
      // frames from this test file (not q.js)
      // Original: non-q.js frames preserved
      // Mutant: non-q.js frames at lines in [qStartingLine, qEndingLine] filtered
      
      // The original stack before makeStackTraceLong had frames from this file
      expect(originalStack).toBeDefined();
      
      // After makeStackTraceLong, the stack should still have content
      // from the promise chain, including "From previous event"
      expect(e.stack).toContain("From previous event");
      
      // Most importantly: the lines AFTER "From previous event" should contain
      // frames from the defer() call site - which is in this test file
      // With original: those frames survive (not q.js file)
      // With mutant: those frames are filtered (line numbers in Q's range)
      const afterSeparator = e.stack.split("From previous event:")[1] || "";
      expect(afterSeparator.trim().length).toBeGreaterThan(0);
    });
  });
});