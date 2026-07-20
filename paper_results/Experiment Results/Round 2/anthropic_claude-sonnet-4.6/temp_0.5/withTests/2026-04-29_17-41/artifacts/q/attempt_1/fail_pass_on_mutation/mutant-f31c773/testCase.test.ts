import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should set a property on an object using Q.set with key and value arguments", () => {
    const object: { a?: number } = {};
    return Q(object)
      .set("a", 42)
      .then(function () {
        expect(object.a).toBe(42);
      });
  });
});