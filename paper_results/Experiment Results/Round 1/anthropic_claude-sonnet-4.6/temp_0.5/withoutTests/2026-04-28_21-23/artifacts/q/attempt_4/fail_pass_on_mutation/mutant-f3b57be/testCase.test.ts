import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback", () => {
  it("should correctly reduce promises array using fallback when native reduce unavailable", async () => {
    const originalReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    const result = await QFresh.all([QFresh.resolve(1), QFresh.resolve(2)]);
    expect(result).toEqual([1, 2]);
  });
});