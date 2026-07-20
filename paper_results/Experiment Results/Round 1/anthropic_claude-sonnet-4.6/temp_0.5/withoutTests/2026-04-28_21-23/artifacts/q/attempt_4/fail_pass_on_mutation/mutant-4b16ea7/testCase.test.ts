import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("resolves chained promises correctly", () => {
    return Q(1)
      .then((v: number) => v + 1)
      .then((v: number) => v + 1)
      .then((v: number) => {
        expect(v).toBe(3);
      });
  });
});