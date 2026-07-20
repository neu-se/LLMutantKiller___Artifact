const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.set", () => {
  it("should return a promise when setting a property", async () => {
    const obj = {};
    const promise = Q(obj);
    const result = promise.set("test", "value");
    expect(result).toBeInstanceOf(Promise);
    await result;
    expect(obj).toHaveProperty("test", "value");
  });
});