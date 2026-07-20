import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback", () => {
  it("should correctly process all promises using internal array reduction", async () => {
    // Delete Array.prototype.reduce to force Q's internal fallback
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    // Re-require Q with the fallback active
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QFallback = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Array.prototype.reduce = originalReduce;
    
    const result = await QFallback.all([
      QFallback.resolve(1),
      QFallback.resolve(2),
      QFallback.resolve(3)
    ]);
    expect(result).toEqual([1, 2, 3]);
  });
});