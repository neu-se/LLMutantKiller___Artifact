import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("with longStackSupport, stack should not contain node internal module frames", async () => {
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const chain = deferred.promise.then((): never => { throw new Error("test"); });
    deferred.resolve(1);

    let caughtStack = "";
    await chain.then(null, (e: Error) => {
      caughtStack = e.stack || "";
    });

    // Original isNodeFrame: only returns true for "(module.js:" or "(node.js:" lines
    // These patterns don't exist in modern Node - so those lines are NOT kept
    // Mutated isNodeFrame: always true - so ALL non-internal lines ARE kept
    // The difference: with mutation, the stack would include MORE lines
    // Specifically, lines that are NOT "(module.js:" or "(node.js:" but are non-internal
    // In original: such lines are filtered OUT
    // In mutated: such lines are kept
    // So: original stack should NOT contain test file references after filtering
    // But we've seen it does... 
    
    // New approach: check that the stack contains ONLY node module lines
    // i.e., lines that match the original isNodeFrame criteria
    const stackLines = caughtStack.split("\n").filter((l: string) => l.trim().startsWith("at "));
    const hasNonNodeLines = stackLines.some((l: string) => 
      !l.includes("(module.js:") && !l.includes("(node.js:")
    );
    
    // Original: only node module lines kept -> no non-node lines -> hasNonNodeLines = false
    // Mutated: all lines kept -> test file lines present -> hasNonNodeLines = true
    expect(hasNonNodeLines).toBe(false);
  });
});