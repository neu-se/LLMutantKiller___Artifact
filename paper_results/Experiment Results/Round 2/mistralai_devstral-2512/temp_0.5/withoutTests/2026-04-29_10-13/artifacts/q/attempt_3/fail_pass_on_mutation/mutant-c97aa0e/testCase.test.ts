const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should resolve when the first promise in the array resolves", async () => {
    const promise1 = Q.delay(100, "slow");
    const promise2 = Q.resolve("fast");
    const promise3 = Q.delay(200, "slower");

    const result = await Q.any([promise1, promise2, promise3]);
    expect(result).toBe("fast");
  });
});