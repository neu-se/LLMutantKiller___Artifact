describe("Q with array_reduce fallback", () => {
  it("Q.all resolves correctly using array_reduce fallback", async () => {
    jest.resetModules();
    
    const savedReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = savedReduce;
    }
    
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});