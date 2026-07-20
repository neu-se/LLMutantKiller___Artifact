describe("Q array_reduce shim", () => {
  it("correctly reduces without initial value using shim", async () => {
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    const result = await Q.all([Q.resolve(1), Q.resolve(2)]);
    expect(result).toEqual([1, 2]);
  });
});