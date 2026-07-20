import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly spread array values to fulfillment callback", () => {
    return Q.spread([1, 2, 3], function(a: number, b: number, c: number) {
      expect(a).toBe(1);
      expect(b).toBe(2);
      expect(c).toBe(3);
    });
  });
});