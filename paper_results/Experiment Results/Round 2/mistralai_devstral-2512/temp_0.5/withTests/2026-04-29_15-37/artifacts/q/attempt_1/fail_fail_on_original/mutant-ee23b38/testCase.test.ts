import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set", () => {
  it("should set a property on the resolved object", () => {
    const obj = {};
    return Q(obj)
      .set("testKey", "testValue")
      .then((result) => {
        expect(result).toBeUndefined();
        expect(obj.testKey).toBe("testValue");
      });
  });
});