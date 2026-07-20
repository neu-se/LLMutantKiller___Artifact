import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set static method", () => {
  it("should set the specified property with the specified value on the target object", () => {
    const object: Record<string, number> = {};
    return Q.set(object, "myKey", 99).then(function () {
      expect(object["myKey"]).toBe(99);
    });
  });
});