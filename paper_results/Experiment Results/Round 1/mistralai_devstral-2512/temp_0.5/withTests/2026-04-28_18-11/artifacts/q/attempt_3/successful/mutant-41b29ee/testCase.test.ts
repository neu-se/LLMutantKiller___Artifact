const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior", () => {
  it("should resolve with an array of fulfilled values when given an array of promises", async () => {
    const promises = [Q(1), Q(2), Q(3)];
    const result = await Q.all(promises);
    expect(result).toEqual([1, 2, 3]);
  });
});