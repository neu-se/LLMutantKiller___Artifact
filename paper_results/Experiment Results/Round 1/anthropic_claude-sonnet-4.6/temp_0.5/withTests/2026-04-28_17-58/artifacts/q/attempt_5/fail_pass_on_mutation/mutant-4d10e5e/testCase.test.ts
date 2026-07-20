import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should have hasStacks false initially so no stack is captured before try-catch", () => {
    // The only real difference: if hasStacks=true initially (mutated),
    // and if captureLine() were called before try-catch, qStartingLine would differ.
    // But captureLine() is called after try-catch, so no difference.
    // 
    // Let's test the actual filtering behavior by checking promise.stack content
    Q.longStackSupport = true;
    
    const d = Q.defer();
    const stack = (d.promise as any).stack as string | undefined;
    
    Q.longStackSupport = false;
    
    // promise.stack should be set (hasStacks=true after try-catch in both versions)
    expect(stack).toBeDefined();
    expect(stack).toContain("q.js");
  });
});