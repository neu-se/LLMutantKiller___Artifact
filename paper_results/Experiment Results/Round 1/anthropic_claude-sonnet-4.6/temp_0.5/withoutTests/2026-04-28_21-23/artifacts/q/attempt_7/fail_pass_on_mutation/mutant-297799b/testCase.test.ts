import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("long stack support should reduce number of at-lines compared to original error stack", async () => {
    // Get original error stack (no filtering)
    Q.longStackSupport = false;
    const d1 = Q.defer();
    const err1 = new Error("test");
    d1.reject(err1);
    const captured1 = await d1.promise.then(null, (e: any) => e);
    const originalAtLines = (captured1?.stack || "").split("\n").filter((l: string) => l.trim().startsWith("at ")).length;
    
    // Get filtered stack (with filtering)
    Q.longStackSupport = true;
    const d2 = Q.defer();
    const err2 = new Error("test");
    d2.reject(err2);
    const captured2 = await d2.promise.then(null, (e: any) => e);
    const filteredAtLines = (captured2?.stack || "").split("\n").filter((l: string) => l.trim().startsWith("at ")).length;
    
    // Original isNodeFrame: keeps only (module.js: or (node.js: lines → fewer at-lines
    // Mutation (always true): keeps ALL non-internal lines → more at-lines (>= originalAtLines)
    expect(filteredAtLines).toBeLessThan(originalAtLines);
  });
});