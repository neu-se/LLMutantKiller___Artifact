describe("array_map fallback shim", () => {
  it("maps array elements correctly when native map is unavailable", (done) => {
    const savedMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;
    
    jest.isolateModules(() => {
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      Array.prototype.map = savedMap;
      
      Q.allSettled([1, 2, 3]).then((results: any[]) => {
        expect(results.length).toBe(3);
        expect(results[0].value).toBe(1);
        expect(results[1].value).toBe(2);
        expect(results[2].value).toBe(3);
        done();
      });
    });
  });
});