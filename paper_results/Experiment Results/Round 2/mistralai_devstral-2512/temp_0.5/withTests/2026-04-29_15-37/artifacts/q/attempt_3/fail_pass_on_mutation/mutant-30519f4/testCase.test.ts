const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should resolve immediately when all promises in the array are already fulfilled", async () => {
    const fulfilledPromises = [Q(1), Q(2), Q(3)];
    const result = await Q.all(fulfilledPromises);
    expect(result).toEqual([1, 2, 3]);
  });
});