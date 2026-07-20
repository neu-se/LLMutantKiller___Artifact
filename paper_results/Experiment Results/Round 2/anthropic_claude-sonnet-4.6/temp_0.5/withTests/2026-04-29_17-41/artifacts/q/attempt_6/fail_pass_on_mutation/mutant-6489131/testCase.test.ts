import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce internal fallback", () => {
  it("handles reduce without initial value correctly when Array.prototype.reduce is absent", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    try {
      // Re-require Q with the fallback active
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
      const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Now use array_map (which uses array_reduce fallback with void 0 as initial)
      // through allResolved which uses array_map
      return QFresh.allSettled([QFresh.resolve(1), QFresh.resolve(2)])
        .then(function(results: any[]) {
          expect(results).toEqual([
            { state: "fulfilled", value: 1 },
            { state: "fulfilled", value: 2 }
          ]);
        });
    } finally {
      Array.prototype.reduce = originalReduce;
      // Restore original Q in cache
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
    }
  });
});