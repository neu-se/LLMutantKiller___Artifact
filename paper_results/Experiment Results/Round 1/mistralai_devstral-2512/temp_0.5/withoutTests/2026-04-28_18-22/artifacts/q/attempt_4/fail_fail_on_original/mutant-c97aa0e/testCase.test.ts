const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should resolve with the first fulfilled promise value", async () => {
    const promise1 = Q.delay(50, "first");
    const promise2 = Q.delay(10, "second");
    const promise3 = Q.delay(100, "third");

    const result = await Q.any([promise1, promise2, promise3]);
    expect(result).toBe("second");
  });
});