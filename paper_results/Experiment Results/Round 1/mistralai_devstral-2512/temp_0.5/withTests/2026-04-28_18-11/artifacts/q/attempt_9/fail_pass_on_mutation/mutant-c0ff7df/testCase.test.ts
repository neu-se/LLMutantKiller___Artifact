import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method", () => {
  it("should fail when dispatch is called with empty operation string", () => {
    const testObject = { foo: "bar" };
    return Q(testObject).get("foo").then((value: unknown) => {
      expect(value).toBe("bar");
    }).catch((error: unknown) => {
      expect.fail("Should not have caught an error");
    });
  });
});