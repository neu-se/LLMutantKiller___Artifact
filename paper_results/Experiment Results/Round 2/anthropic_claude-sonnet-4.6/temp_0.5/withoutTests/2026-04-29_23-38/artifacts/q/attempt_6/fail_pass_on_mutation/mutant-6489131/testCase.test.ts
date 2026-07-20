describe("Q", () => {
  it("array reduce fallback with no initial value sets basis from first element", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = originalReduce;
    const result = await Q.all([Q.resolve(1), Q.resolve(2)]);
    expect(result).toEqual([1, 2]);
  });
});