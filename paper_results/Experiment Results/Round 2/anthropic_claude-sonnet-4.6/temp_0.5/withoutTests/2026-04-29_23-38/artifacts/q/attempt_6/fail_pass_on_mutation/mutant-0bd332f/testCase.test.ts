describe("Q with array_reduce fallback", () => {
  it("resolves Q.all correctly using fallback reduce", async () => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = origReduce;
    const result = await Q.all([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
});