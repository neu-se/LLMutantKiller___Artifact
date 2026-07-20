import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then done flag", () => {
  it("should resolve to fulfilled value and not be overwritten by rejection path", () => {
    return Q(42)
      .then((v: number) => v * 2)
      .then((v: number) => {
        expect(v).toBe(84);
      });
  });
});