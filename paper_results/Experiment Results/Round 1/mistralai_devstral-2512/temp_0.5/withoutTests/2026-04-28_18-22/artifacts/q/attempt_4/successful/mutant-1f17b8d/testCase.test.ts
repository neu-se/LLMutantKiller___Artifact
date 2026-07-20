const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.all", () => {
  it("should resolve with an array of fulfilled values when all promises are resolved", async () => {
    const promises = [
      Q.delay(1, 10),
      Q.delay(2, 10),
      Q.delay(3, 10)
    ];

    const result = await Q.all(promises);
    expect(result).toEqual([1, 2, 3]);
  });
});