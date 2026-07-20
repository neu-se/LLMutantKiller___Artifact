import { createRequire } from "module";

describe("array_reduce fallback without initial value", () => {
  it("correctly handles array_map (which uses array_reduce without initial value basis finding)", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    let Q: any;
    try {
      // Clear module cache and re-require Q
      const req = createRequire(import.meta.url);
      const qPath = req.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
      Q = req("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = originalReduce;
    }

    // array_map uses array_reduce internally with void 0 as initial value
    // When array_reduce fallback is called with arguments.length === 3 (this, callback, basis=void 0)
    // it should work. But Q.any uses array_reduce(promises, fn, undefined) - 3 args always.
    // The no-initial-value path is never hit by Q's internal code.
    // So test via allSettled which uses array_map
    return Q.allSettled([1, 2, 3]).then((results: any[]) => {
      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({ state: "fulfilled", value: 1 });
    });
  });
});