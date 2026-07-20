const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.del", () => {
  it("should correctly dispatch the 'delete' operation", async () => {
    const obj = { key: "value" };
    const promise = Q(obj);
    const result = await promise.del("key");
    expect(result).toBe(undefined);
    expect(obj).not.toHaveProperty("key");
  });
});