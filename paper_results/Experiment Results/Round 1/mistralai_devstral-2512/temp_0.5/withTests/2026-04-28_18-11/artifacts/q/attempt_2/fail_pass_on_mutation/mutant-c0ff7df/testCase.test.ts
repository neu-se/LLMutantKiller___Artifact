import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method", () => {
  it("should correctly retrieve a property from an object", () => {
    const testObject = { foo: "bar" };
    return Q(testObject).get("foo").then((value: unknown) => {
      expect(value).toBe("bar");
    });
  });
});