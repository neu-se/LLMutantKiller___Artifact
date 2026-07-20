import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should resolve Q.all with already-fulfilled promises", () => {
    return Q.all([Q(1), Q(2), Q(3)]).then((values: number[]) => {
      expect(values).toEqual([1, 2, 3]);
    });
  });
});