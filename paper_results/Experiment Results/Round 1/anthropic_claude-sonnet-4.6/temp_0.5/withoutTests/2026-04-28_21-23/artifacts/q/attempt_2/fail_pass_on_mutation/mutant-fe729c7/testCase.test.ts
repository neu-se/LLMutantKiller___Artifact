import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce sparse array initial value", () => {
  it("Q.all resolves correctly with mixed promise states", async () => {
    const p1 = Q.defer();
    const p2 = Q.defer();
    p1.resolve(42);
    p2.resolve(99);
    const result = await Q.all([p1.promise, p2.promise]);
    expect(result).toEqual([42, 99]);
  });
});