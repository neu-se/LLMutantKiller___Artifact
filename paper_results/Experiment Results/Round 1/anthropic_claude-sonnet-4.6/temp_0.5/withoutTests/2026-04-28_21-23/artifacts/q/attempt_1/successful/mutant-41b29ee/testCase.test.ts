import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should resolve with an array of fulfilled values when all promises resolve", async () => {
    const p1 = Q.resolve(1);
    const p2 = Q.resolve(2);
    const p3 = Q.resolve(3);

    const result = await Q.all([p1, p2, p3]);
    expect(result).toEqual([1, 2, 3]);
  });
});