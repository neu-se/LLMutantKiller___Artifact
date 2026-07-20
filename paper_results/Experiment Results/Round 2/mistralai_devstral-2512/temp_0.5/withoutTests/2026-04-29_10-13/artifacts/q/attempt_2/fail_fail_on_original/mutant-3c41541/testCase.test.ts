import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property from an object", () => {
    const obj = { foo: "bar", baz: "qux" };
    return Q.delete(obj, "foo").then(() => {
      expect(obj).toEqual({ baz: "qux" });
    });
  });
});