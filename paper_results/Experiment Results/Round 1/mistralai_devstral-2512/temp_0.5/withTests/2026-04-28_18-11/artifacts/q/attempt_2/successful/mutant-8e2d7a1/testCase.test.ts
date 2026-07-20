const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.set", () => {
  it("should set a property on the object", () => {
    const obj = {};
    return Q(obj)
      .set("testKey", "testValue")
      .then(() => {
        expect((obj as any).testKey).toBe("testValue");
      });
  });
});