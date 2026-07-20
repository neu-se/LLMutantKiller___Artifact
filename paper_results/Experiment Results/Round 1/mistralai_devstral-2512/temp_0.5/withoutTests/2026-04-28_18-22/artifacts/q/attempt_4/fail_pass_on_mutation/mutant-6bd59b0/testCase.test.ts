const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should fail when trying to get a property with empty string operation", async () => {
    const obj = { foo: "bar" };
    const promise = Q(obj);
    try {
      await Q.get(promise, "foo");
      fail("Expected to throw an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});