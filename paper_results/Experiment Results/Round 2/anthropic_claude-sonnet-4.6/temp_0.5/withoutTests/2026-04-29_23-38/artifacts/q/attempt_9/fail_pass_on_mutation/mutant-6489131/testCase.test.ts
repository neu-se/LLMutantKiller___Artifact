describe("Q", () => {
  it("array_reduce fallback initializes basis correctly without initial value", async () => {
    const origReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = origReduce;

    // Call Q.promised which uses spread which uses array_reduce indirectly
    // with the fallback active
    const add = Q.promised(function(a: number, b: number) { return a + b; });
    const result = await add(1, 2);
    expect(result).toBe(3);
  });
});