describe("array_reduce fallback shim", () => {
  it("should correctly reduce array values when native reduce is unavailable", async () => {
    // Remove native reduce before loading the module
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    
    let Q: any;
    try {
      // Dynamic import won't work for CJS, use require
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = originalReduce;
    }
    
    // Now test something that uses array_reduce internally
    // Q.all uses array_reduce to process promises
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});