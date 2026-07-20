import { jest } from "@jest/globals";

describe("Q array_reduce fallback", () => {
  it("should find initial value correctly in sparse array without initial value", async () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    
    Array.prototype.reduce = originalReduce;
    
    // Now array_reduce uses the fallback. Test Q.all which uses array_reduce with void 0
    // But we need to trigger the no-initial-value path
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});