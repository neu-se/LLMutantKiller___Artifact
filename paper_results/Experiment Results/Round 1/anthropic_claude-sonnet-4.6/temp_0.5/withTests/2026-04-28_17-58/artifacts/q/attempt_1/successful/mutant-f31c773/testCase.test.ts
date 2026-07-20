import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should set the property on the object with the correct key and value", () => {
    const object = { a: 0 };
    return Q.set(object, "a", 42).then(() => {
      expect(object.a).toBe(42);
    });
  });
});