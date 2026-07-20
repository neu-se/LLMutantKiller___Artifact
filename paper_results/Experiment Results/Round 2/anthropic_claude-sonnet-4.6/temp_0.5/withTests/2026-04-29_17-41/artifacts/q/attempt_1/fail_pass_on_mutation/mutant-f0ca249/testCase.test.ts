import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with multiple promises", () => {
  it("should resolve all promises and return their values in order", async () => {
    const results = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3),
    ]);
    expect(results).toEqual([1, 2, 3]);
  });
});