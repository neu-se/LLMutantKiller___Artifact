describe("Q.all sparse array hole handling via array_reduce shim", () => {
  it("should not fill sparse array holes when reduce shim skips missing indices", (done) => {
    // Remove native Array.prototype.reduce to force Q to use its internal shim
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;

    // Clear module cache so Q re-evaluates and captures the shim instead of native reduce
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore native reduce for other code
    Array.prototype.reduce = originalReduce;

    // Create sparse array with a hole at index 1
    const sparse: any[] = [];
    sparse[0] = QFresh.resolve(10);
    sparse[2] = QFresh.resolve(30);
    // sparse[1] is a hole (not set at all)

    // Original shim: if (index in this) skips hole at index 1
    //   → callback never called for index 1 → promises[1] never set → remains a hole
    // Mutated shim: if (true) processes hole at index 1
    //   → when(undefined, callback) fires → sets promises[1] = undefined → 1 in result is true

    QFresh.all(sparse).then((result: any[]) => {
      expect(1 in result).toBe(false);
      done();
    }).catch(done);
  });
});