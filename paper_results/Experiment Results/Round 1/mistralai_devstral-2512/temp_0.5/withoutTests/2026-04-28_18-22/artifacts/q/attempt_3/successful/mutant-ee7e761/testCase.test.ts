const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Promise.prototype.delete", () => {
  it("should delete a property from a fulfilled promise", () => {
    const obj = { foo: "bar", baz: "qux" };
    const promise = Q.resolve(obj);
    return promise["delete"]("foo").then(() => {
      expect(obj.foo).toBeUndefined();
      expect(obj.baz).toBe("qux");
    });
  });
});