import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with multiple promises", () => {
  it("resolves all promises and returns their values in order", async () => {
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});