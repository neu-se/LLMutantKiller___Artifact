import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior", () => {
  it("should resolve all promises in an array correctly", async () => {
    const result = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ]);
    expect(result).toEqual([1, 2, 3]);
  });
});