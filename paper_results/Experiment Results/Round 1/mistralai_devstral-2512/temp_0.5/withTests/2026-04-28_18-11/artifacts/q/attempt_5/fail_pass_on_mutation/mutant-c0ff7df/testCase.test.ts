import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method", () => {
  it("should fail when dispatch is called with empty string instead of 'get'", () => {
    const testObject = { foo: "bar" };
    const promise = Q(testObject).get("foo");
    return promise.then((value: unknown) => {
      expect(value).toBe("bar");
    }).catch((error: unknown) => {
      expect.fail("Should not have caught an error");
    });
  });
});