import { createRequire } from "module";

describe("array_reduce shim with explicit basis", () => {
  it("Q.all resolves correctly when Array.prototype.reduce is unavailable at load time", async () => {
    // Remove Array.prototype.reduce before loading Q so the shim is used
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    let QModule: any;
    try {
      // Clear require cache to force re-evaluation of q.js with the shim
      const requireFunc = createRequire(import.meta.url);
      const qPath = requireFunc.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
      QModule = requireFunc("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = originalReduce;
    }

    // With the mutation (if true), array_reduce called with explicit basis (void 0)
    // will incorrectly seek first element as basis, causing the callback to receive
    // the first promise as `undefined` parameter instead of void 0, breaking Q.all.
    const result = await QModule.all([QModule(1), QModule(2), QModule(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});