import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce polyfill", () => {
  it("allSettled works correctly with the array_map polyfill path", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    // Force re-evaluation by clearing require cache
    const Module = require("module");
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.reduce = originalReduce;

    return QFresh.allSettled([1, 2, 3]).then((results: any[]) => {
      expect(results).toEqual([
        { state: "fulfilled", value: 1 },
        { state: "fulfilled", value: 2 },
        { state: "fulfilled", value: 3 },
      ]);
    });
  });
});