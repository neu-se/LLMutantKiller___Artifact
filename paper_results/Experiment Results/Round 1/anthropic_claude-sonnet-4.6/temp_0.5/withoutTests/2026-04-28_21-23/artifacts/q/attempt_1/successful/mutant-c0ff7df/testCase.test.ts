import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get dispatch", () => {
  it("should retrieve a property value from a promise using get dispatch", async () => {
    const obj = { foo: 42 };
    const result = await Q.get(obj, "foo");
    expect(result).toBe(42);
  });
});