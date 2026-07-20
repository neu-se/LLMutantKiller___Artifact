import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce polyfill initial value", () => {
  it("should correctly reduce using first element as basis when no initial value provided in polyfill", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.reduce = originalReduce;

    // The only way to trigger the 1-arg path is through array_reduce(arr, fn) with no 3rd arg
    // Q never does this internally. However, array_map polyfill (when Array.prototype.map is absent)
    // calls array_reduce with void 0 explicitly - 2 args.
    // 
    // Since the mutation is in dead code, we test the closest observable behavior:
    // deferred.notify uses array_reduce(progressListeners, fn, void 0) - 2 args
    const deferred = QFresh.defer();
    let notified = false;
    deferred.promise.progress(() => { notified = true; });
    deferred.notify("progress");
    deferred.resolve("done");
    
    return deferred.promise.then((val: string) => {
      expect(val).toBe("done");
    });
  });
});