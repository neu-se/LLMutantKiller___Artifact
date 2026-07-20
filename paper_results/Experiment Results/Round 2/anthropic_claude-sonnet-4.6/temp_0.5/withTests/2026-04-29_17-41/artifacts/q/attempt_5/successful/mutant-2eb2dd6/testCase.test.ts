describe("array_reduce fallback implementation", () => {
  it("should correctly sum values using the reduce fallback when Array.prototype.reduce is unavailable", async () => {
    const originalReduce = Array.prototype.reduce;
    
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    
    // Now import Q - it will capture Array.prototype.reduce as undefined
    // and use the fallback implementation
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore immediately after load
    Array.prototype.reduce = originalReduce;
    
    // Q.all uses array_reduce internally with the fallback
    // Original: for loop accumulates, pendingCount increments correctly
    // Mutated: for loop body is empty, callback never called, 
    //          pendingCount stays 0, resolves immediately with promise objects
    const p1 = Q.defer();
    const p2 = Q.defer();
    
    const allPromise = Q.all([p1.promise, p2.promise]);
    
    p1.resolve(10);
    p2.resolve(20);
    
    const result = await allPromise;
    expect(result).toEqual([10, 20]);
  });
});