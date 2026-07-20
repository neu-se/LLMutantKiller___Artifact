describe("array_reduce fallback processes first element with initial basis", () => {
  it("Q.all resolves correctly with a single element when using array_reduce fallback", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();

    let Q: any;
    try {
      const mod = await import("../../../../../../../../../../../subject_repositories/q/q.js");
      Q = mod.default || mod;
    } finally {
      Array.prototype.reduce = originalReduce;
    }

    // With the mutation (if true instead of if arguments.length === 1):
    // array_reduce([promise], fn, void 0) would:
    //   - Enter the seek block (always true)
    //   - Set basis = this[0] (the promise), index = 1
    //   - Loop from index 1, but length=1, so loop never runs
    //   - The callback fn is never called for index 0
    //   - pendingCount stays 1, deferred never resolves
    //
    // Original behavior: skips seek block (2 args), processes index 0 correctly
    
    const result = await Promise.race([
      Q.all([Q.resolve(42)]),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1000))
    ]);
    
    expect(result).toEqual([42]);
  });
});