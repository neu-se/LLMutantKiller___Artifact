import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("makeStackTraceLong changes err.stack", () => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    
    const uniqueMarker = "UNIQUE_MARKER_12345";
    const fakeError = { stack: `Error: test\n    at userFunc (${uniqueMarker}.js:5:10)` };
    const originalStack = fakeError.stack;
    
    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const newStack = err.stack || "";
      
      // If makeStackTraceLong ran, err.stack should be different from originalStack
      // (it would be the filtered result)
      // Original: filtered result = only node-internal lines (no UNIQUE_MARKER)
      // Mutation: filtered result = all non-internal lines (has UNIQUE_MARKER)
      
      if (newStack === originalStack) {
        // makeStackTraceLong didn't run - can't test the mutation
        // This shouldn't happen if promise.stack is set
        expect(newStack).not.toBe(originalStack); // Force failure to debug
      } else {
        // makeStackTraceLong ran
        // Original: UNIQUE_MARKER should NOT be in filtered result
        // Mutation: UNIQUE_MARKER SHOULD be in filtered result
        expect(newStack.includes(uniqueMarker)).toBe(false);
      }
    });
    
    d.reject(fakeError);
    return p;
  });
});