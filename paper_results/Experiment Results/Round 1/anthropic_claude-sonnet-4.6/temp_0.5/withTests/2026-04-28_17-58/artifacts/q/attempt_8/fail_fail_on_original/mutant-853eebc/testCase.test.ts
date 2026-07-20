import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map fallback via deleted Array.prototype.map", () => {
  it("allResolved maps promises through Q correctly", () => {
    const originalMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;
    
    try {
      const p1 = Q.resolve(1);
      const p2 = Q.resolve(2);
      
      return Q.allResolved([p1, p2]).then(function(promises: any[]) {
        expect(promises.length).toBe(2);
        expect(promises[0].inspect().value).toBe(1);
        expect(promises[1].inspect().value).toBe(2);
      });
    } finally {
      Array.prototype.map = originalMap;
    }
  });
});