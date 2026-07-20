import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set", () => {
  it("should set a property on the object and fulfill with undefined", () => {
    const object: { a?: number } = {};
    return Q(object)
      .set("a", 1)
      .then(function (result: unknown) {
        expect(result).toBe(undefined);
        expect(object.a).toBe(1);
      });
  });
});