const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.all", () => {
  it("should resolve with an array of fulfilled values when all promises are resolved", async () => {
    const promises = [
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ];

    const result = await Q.all(promises);
    expect(result).toEqual([1, 2, 3]);
  });
});