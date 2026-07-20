import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should resolve with the fulfilled values of all promises", async () => {
    const promises = [
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ];

    const result = await Q.all(promises);

    expect(result).toEqual([1, 2, 3]);
  });
});