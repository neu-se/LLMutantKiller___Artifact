const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.join", () => {
  it("should resolve when values are the same", async () => {
    const promise1 = Q(1);
    const promise2 = Q(1);
    await expect(promise1.join(promise2)).resolves.toBe(1);
  });
});