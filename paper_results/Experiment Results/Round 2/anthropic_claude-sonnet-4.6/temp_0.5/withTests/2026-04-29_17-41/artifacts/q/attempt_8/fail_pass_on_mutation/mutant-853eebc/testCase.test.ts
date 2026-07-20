import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with fulfilled promises", () => {
  it("resolves with mapped values preserving order", () => {
    return Q.all([Q.resolve(10), Q.resolve(20), Q.resolve(30)])
      .then((values: number[]) => {
        expect(values).toEqual([10, 20, 30]);
        expect(values[0]).toBe(10);
        expect(values[1]).toBe(20);
        expect(values[2]).toBe(30);
      });
  });
});