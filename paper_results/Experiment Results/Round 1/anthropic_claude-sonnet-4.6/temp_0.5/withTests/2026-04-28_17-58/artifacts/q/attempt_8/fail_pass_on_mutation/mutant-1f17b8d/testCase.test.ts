import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should fulfill with 3 elements when one is pending and resolves later", () => {
    const d = Q.defer();
    
    // Mix: one sync-fulfilled (will take the if branch) and one pending (takes else branch)
    const syncFulfilled = Q.fulfill(42);
    
    const allResult = Q.all([syncFulfilled, d.promise]);
    
    // With mutation: pendingCount=0 after processing, resolves immediately with [42, promise]
    // With original: pendingCount=1, waits for d to resolve
    
    d.resolve(99);
    
    return allResult.then(function(values: any[]) {
      expect(values.length).toBe(2);
      expect(values[0]).toBe(42);
      expect(values[1]).toBe(99);
    });
  });
});