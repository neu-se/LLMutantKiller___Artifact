import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("filtered stack should only contain node internal frames", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    deferred.reject(new Error("test"));
    
    const err = await deferred.promise.then(null, (e: any) => e);
    const stack: string = err?.stack || "";
    
    // With original isNodeFrame: only (module.js: or (node.js: lines kept
    // → every "at" line contains (module.js: or (node.js:
    // With mutation (always true): ALL non-internal lines kept
    // → some "at" lines do NOT contain these patterns
    const atLines = stack.split("\n").filter((l: string) => l.trim().startsWith("at "));
    const allAreNodeFrames = atLines.every((l: string) => 
      l.includes("(module.js:") || l.includes("(node.js:")
    );
    expect(allAreNodeFrames).toBe(true);
  });
});