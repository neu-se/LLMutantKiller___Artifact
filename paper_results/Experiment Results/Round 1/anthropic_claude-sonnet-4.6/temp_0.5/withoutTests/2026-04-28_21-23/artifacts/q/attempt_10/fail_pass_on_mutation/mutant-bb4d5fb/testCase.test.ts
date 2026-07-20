import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame mutation", () => {
  it("separator appears and non-Q frame before separator is preserved", async () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    
    const err = new Error("test");
    Object.defineProperty(err, 'stack', {
      value: 'Error: test\n    at syntheticFrame (/totally/different/file.js:5:1)',
      configurable: true,
      writable: true
    });
    
    d.reject(err);
    
    let caught: any;
    await new Promise<void>(resolve => {
      d.promise.then(null, (e: any) => { caught = e; resolve(); });
    });
    
    const stack = caught.stack || '';
    
    // First verify makeStackTraceLong ran
    expect(stack).toContain("From previous event:");
    
    // Then verify non-Q frame survived
    // Original: /totally/different/file.js !== qFileName -> frame kept
    // Mutation: true && 5 <= qEndingLine -> frame removed
    expect(stack).toContain("syntheticFrame");
  });
});