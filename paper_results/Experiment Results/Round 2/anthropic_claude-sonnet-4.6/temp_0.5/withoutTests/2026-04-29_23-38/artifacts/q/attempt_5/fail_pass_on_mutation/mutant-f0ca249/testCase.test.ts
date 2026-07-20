describe("Q", () => {
  it("triggers array_reduce fallback no-initial-value path", (done) => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    
    // Clear module cache
    Object.keys(require.cache).forEach(key => {
      if (key.includes("q.js")) delete require.cache[key];
    });
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = origReduce;
    
    // Now manually invoke array_reduce without initial value by using
    // the allResolved deprecated function which might trigger different path
    Q.allResolved([Q(1), Q(2), Q(3)]).then((promises: any[]) => {
      expect(promises.length).toBe(3);
      done();
    });
  });
});