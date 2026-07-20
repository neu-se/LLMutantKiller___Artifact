describe("Q array_reduce fallback sparse array", () => {
  it("Q.all with sparse array resolves correctly", async () => {
    let QFresh: any;
    
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.isolateModules(() => {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    Array.prototype.reduce = nativeReduce;
    
    // sparse array: [Q(1), <hole>, Q(3)]
    const sparse: any[] = [QFresh(1), , QFresh(3)];
    
    // With original: callback NOT called for hole → pendingCount not incremented for hole
    // With mutant: callback called for hole (undefined promise) → when(undefined,...) 
    //   → Q(undefined) = fulfill(undefined) → already fulfilled → promises[1] = undefined
    //   → pendingCount incremented then decremented → deferred resolves with [1, undefined, 3]
    
    // Actually both might resolve... let me think about what Q.all does with undefined:
    // isPromise(undefined) = false, snapshot check fails
    // so ++pendingCount, then when(undefined, ...) → Q(undefined).then(...)
    // Q(undefined) = fulfill(undefined) → fulfilled immediately
    // so promises[1] = undefined, --pendingCount
    // Result: [1, undefined, 3]
    
    // With original: hole skipped entirely, pendingCount only for index 0 and 2
    // deferred.resolve called when pendingCount hits 0
    // promises array still has hole at [1]
    // Result: [1, <hole>, 3] - sparse array
    
    const result = await QFresh.all(sparse);
    // Original: result[1] is undefined (hole), result is sparse
    // Mutant: result[1] is undefined (explicitly set)
    // Both seem to give undefined for [1]... 
    
    // But the KEY difference: with original, index 1 is never set in promises[]
    // so `1 in result` is false (sparse hole)
    // With mutant, promises[1] = undefined is explicitly set
    // so `1 in result` is true
    expect(1 in result).toBe(false); // original preserves sparse hole
  });
});