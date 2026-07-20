import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread", () => {
  it("should spread array values as arguments to the callback", () => {
    return Q.spread([1, 2, 3], function (a: number, b: number, c: number) {
      expect(a).toBe(1);
      expect(b).toBe(2);
      expect(c).toBe(3);
    });
  });
});