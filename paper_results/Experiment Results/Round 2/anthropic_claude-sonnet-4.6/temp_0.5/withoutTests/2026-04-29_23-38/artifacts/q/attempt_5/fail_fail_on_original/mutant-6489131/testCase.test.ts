describe("Q", () => {
  it("fallback reduce handles sparse array correctly", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = originalReduce;
    
    // Force a code path that would use array_reduce without initial value
    // by using array_map fallback on a sparse array
    const sparse: number[] = [];
    sparse[0] = 1;
    sparse[2] = 3;
    
    const result = await Q.all(sparse.map(v => Q.resolve(v)));
    expect(result).toEqual([1, 3]);
  });
});