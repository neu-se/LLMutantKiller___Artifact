import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should remain pending until deferred promises resolve, not resolve immediately with promise objects", () => {
    const d = Q.defer();
    
    const allResult = Q.all([d.promise]);
    
    // With mutation: allResult resolves immediately (pendingCount=0) with [d.promise]
    // With original: allResult stays pending until d resolves
    
    // Check state before resolving d - after enough ticks for Q.all internals
    return Q.delay(10).then(function() {
      expect(allResult.isPending()).toBe(true);
    }).then(function() {
      d.resolve(42);
      return allResult;
    }).then(function(values: any[]) {
      expect(values[0]).toBe(42);
    });
  });
});