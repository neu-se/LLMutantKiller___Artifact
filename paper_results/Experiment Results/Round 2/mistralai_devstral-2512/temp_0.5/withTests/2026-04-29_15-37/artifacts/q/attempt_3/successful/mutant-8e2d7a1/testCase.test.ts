const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.set", () => {
  it("should dispatch with the correct operation name", async () => {
    const obj = {};
    const promise = Q(obj).set("key", "value");
    await promise;
    expect((obj as any).key).toBe("value");
  });
});