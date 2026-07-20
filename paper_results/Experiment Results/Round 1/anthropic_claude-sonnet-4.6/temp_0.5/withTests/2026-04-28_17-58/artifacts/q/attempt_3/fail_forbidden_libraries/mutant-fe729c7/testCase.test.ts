import { describe, it, expect } from "@jest/globals";

describe("array_reduce shim sparse array behavior", () => {
  it("Q.all resolves correctly with a sparse array using the array_reduce shim", (done) => {
    // Remove Array.prototype.reduce to force Q to use its internal shim
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    
    // Clear require cache so Q re-evaluates with the shim
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore native reduce
    Array.prototype.reduce = originalReduce;
    
    // Create a sparse array - index 1 is a hole
    const sparse: any[] = [];
    sparse[0] = QFresh.resolve("a");
    sparse[2] = QFresh.resolve("c");
    // sparse[1] is a hole (not even undefined - doesn't exist)
    
    // With original shim: if (index in this) skips hole at index 1
    //   -> callback not called for index 1 -> promises[1] stays as hole
    //   -> pendingCount incremented for index 0 and 2 only
    // With mutated shim: if (true) processes hole at index 1
    //   -> callback called with undefined for index 1
    //   -> undefined is not a promise, so promises[1] = undefined immediately
    //   -> pendingCount still 2, resolves with [a, undefined, c]
    // Both might give same result... 
    
    QFresh.all(sparse).then((result: any[]) => {
      expect(result[0]).toBe("a");
      expect(result[2]).toBe("c");
      done();
    }).catch(done);
  });
});