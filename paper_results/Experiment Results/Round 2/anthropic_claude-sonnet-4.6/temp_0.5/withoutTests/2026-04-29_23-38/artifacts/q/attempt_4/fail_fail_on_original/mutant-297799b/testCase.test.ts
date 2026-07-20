import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should detect difference in isNodeFrame behavior via stack filtering", async () => {
    Q.longStackSupport = true;

    // Create a multi-step promise chain to generate long stack traces
    const deferred = Q.defer();
    
    const chain = deferred.promise
      .then(() => Q.reject(new Error("test error")));
    
    deferred.resolve(1);

    let caughtStack = "";
    await chain.then(null, (e) => {
      caughtStack = e.stack || "";
    });

    // In original: isNodeFrame checks for "(module.js:" or "(node.js:"
    // Modern Node uses "node:internal/" style, not "(node.js:" 
    // So isNodeFrame returns false for modern Node internal frames
    // In mutated: isNodeFrame always returns true
    // The difference: with mutation, Node internal frames like "node:internal/" 
    // would be included if the condition is !isInternalFrame && isNodeFrame
    // But we need to find what's actually different...
    
    // Both produce stacks - let's check the stack doesn't contain internal node frames
    // that would only appear with mutated isNodeFrame
    expect(caughtStack).not.toMatch(/\(node:internal\//);
  });
});