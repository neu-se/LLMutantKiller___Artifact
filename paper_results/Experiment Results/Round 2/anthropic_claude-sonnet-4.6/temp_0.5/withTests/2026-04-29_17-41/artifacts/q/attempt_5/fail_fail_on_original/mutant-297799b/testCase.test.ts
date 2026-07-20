import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("makeStackTraceLong modifies error stack based on isNodeFrame", () => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    const error = new Error("test");
    const originalStack = error.stack;
    
    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      // If makeStackTraceLong ran:
      // - Original isNodeFrame: err.stack = filtered (only node-internal) = likely ""
      // - Mutated isNodeFrame: err.stack = filtered (all non-internal) = has content
      // If makeStackTraceLong didn't run: err.stack = originalStack (unchanged)
      
      // The key difference: with mutation, err.stack != originalStack (it's longer/different)
      // With original, err.stack might equal originalStack (if makeStackTraceLong didn't run)
      // OR err.stack = "" (if makeStackTraceLong ran and filtered everything out)
      
      // Either way, err.stack should NOT be longer than originalStack with original code
      // With mutation, err.stack could be longer (concatenated stacks)
      
      const stackLength = (err.stack || "").length;
      const originalLength = (originalStack || "").length;
      
      // With mutation: stack is concatenated (longer) or has all frames
      // With original: stack is filtered (shorter or equal)
      expect(stackLength).toBeLessThanOrEqual(originalLength);
    });
    
    d.reject(error);
    return p;
  });
});