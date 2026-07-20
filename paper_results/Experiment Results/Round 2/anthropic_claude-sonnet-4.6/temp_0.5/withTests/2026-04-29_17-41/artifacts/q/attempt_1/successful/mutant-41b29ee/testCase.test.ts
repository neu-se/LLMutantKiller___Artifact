import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should resolve with an array of fulfilled values when all promises resolve", async () => {
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});