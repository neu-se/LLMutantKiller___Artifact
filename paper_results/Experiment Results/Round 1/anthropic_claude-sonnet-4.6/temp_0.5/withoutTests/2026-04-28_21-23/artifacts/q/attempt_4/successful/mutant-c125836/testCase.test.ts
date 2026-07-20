describe("array_reduce fallback with initial value", () => {
  it("should correctly process all elements when reduce is called with an initial basis value", async () => {
    // Remove native Array.prototype.reduce to force the fallback code path
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore native reduce immediately after module load
    Array.prototype.reduce = originalReduce;

    // Q.all uses array_reduce(promises, fn, void 0) with 3 arguments
    // Original: arguments.length === 1 is false, so basis = void 0, all indices processed
    // Mutated: if (true), seeks first element as basis, skips index 0 in for loop
    // So with mutation, promises[0] is never passed to the callback
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});