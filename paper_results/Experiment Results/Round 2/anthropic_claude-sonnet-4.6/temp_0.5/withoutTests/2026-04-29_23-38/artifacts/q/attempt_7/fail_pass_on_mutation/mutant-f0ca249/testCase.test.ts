describe("Q", () => {
  it("should work correctly with array_reduce fallback", async () => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    Object.keys(require.cache).forEach(k => { if (k.includes("q.js")) delete require.cache[k]; });
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = origReduce;
    const d = Q.defer();
    d.resolve(42);
    const v = await d.promise;
    expect(v).toBe(42);
  });
});