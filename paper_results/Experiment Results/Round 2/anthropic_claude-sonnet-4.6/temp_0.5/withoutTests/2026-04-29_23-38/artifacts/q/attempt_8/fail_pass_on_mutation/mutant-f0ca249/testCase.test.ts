describe("Q", () => {
  it("should process multiple pending messages correctly", async () => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    Object.keys(require.cache).forEach(k => { if (k.includes("q.js")) delete require.cache[k]; });
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = origReduce;
    
    const d = Q.defer();
    const results: number[] = [];
    
    // Queue multiple messages before resolving
    for (let i = 0; i < 5; i++) {
      d.promise.then((v: number) => results.push(v + i));
    }
    
    d.resolve(10);
    await d.promise;
    await new Promise(r => setTimeout(r, 50));
    
    expect(results.length).toBe(5);
  });
});