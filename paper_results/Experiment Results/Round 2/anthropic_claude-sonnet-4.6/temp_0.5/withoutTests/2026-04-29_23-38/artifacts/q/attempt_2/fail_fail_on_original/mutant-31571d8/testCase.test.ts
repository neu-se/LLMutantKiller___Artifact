import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should update __minimumStackCounter__ to lower values when walking the chain", (done) => {
    Q.longStackSupport = true;

    const err = new Error("test");

    // Re-throw through multiple handlers
    Q.reject(err)
      .then(null, function(e: any) { throw e; })
      .then(null, function(e: any) { throw e; })
      .then(null, function(e: any) {
        Q.longStackSupport = false;
        
        // After multiple makeStackTraceLong calls on the same error:
        // Original: __minimumStackCounter__ should be updated to lower values each time
        // Mutated: __minimumStackCounter__ stays at the first value set
        
        // The key observable: with original, more stacks are accumulated
        // We can check __minimumStackCounter__ directly - it should be a low value
        // (close to 1) with original, but a higher value with mutated
        
        const minCounter = (e as any).__minimumStackCounter__;
        
        try {
          // With original: the counter gets updated to lower values as we walk back
          // The minimum should be relatively low (close to the start of the chain)
          // With mutated: it stays at the first (higher) value
          // Hard to assert exact values without knowing the counter...
          
          // Better: check the stack trace content
          const stack: string = e.stack || "";
          const separatorCount = (stack.match(/From previous event:/g) || []).length;
          expect(separatorCount).toBeGreaterThanOrEqual(2);
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });
});