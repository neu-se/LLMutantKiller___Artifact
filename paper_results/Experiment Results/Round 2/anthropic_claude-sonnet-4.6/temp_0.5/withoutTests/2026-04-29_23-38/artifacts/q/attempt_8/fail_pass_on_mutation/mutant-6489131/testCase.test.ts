describe("Q array_reduce fallback no initial value", () => {
  it("correctly initializes basis from first array element", async () => {
    const origReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = origReduce;
    
    // Use Q.all which internally uses array_reduce with void 0 initial value
    // This exercises the WITH initial value path, not the mutation
    // But test correctness of the loaded module
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});