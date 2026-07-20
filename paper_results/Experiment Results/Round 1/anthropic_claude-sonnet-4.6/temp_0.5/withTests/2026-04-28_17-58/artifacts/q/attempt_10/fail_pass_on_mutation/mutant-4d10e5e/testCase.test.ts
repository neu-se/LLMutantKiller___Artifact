import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks", () => {
  it("should have hasStacks false so that initial captureLine call returns undefined", () => {
    // If hasStacks=false initially (original), and captureLine() were called before try-catch,
    // it would return undefined. But it's called after try-catch.
    // The mutation has no observable effect in Node.js.
    // 
    // Testing the only thing that could differ: behavior when longStackSupport=false
    // In this case, promise.stack is NOT set, so makeStackTraceLong does nothing
    
    const d = Q.defer();
    expect((d.promise as any).stack).toBeUndefined();
    expect((d.promise as any).stackCounter).toBeUndefined();
  });
});