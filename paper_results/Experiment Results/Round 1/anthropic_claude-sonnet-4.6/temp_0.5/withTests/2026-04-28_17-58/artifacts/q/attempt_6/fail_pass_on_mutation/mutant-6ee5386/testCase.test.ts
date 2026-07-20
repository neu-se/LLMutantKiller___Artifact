import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap static method", () => {
  it("should pass through the original value after calling callback", () => {
    const calls: number[] = [];
    
    return (Q as any).tap(Q(42), function(val: number) {
      calls.push(val);
    }).then(function(result: number) {
      expect(result).toBe(42);
      expect(calls).toEqual([42]);
    });
  });
});