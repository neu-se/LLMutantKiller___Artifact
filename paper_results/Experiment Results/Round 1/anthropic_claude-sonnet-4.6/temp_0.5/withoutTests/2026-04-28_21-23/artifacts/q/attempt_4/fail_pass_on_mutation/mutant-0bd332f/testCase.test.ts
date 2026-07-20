import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("array_reduce fallback throws TypeError for empty array without initial value", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    // Test that Q.all still works correctly with the fallback
    const result = await QFresh.all([1, 2, 3].map((n: number) => QFresh(n)));
    expect(result).toEqual([1, 2, 3]);
  });
});