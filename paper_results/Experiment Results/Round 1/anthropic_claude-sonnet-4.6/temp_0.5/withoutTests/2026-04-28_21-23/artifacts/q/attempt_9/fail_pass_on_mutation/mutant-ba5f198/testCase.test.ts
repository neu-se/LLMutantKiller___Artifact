import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("should correctly resolve a promise chain with when()", () => {
    return Q.when(42, (val: number) => {
      return val * 2;
    }).then((result: number) => {
      expect(result).toBe(84);
    });
  });
});