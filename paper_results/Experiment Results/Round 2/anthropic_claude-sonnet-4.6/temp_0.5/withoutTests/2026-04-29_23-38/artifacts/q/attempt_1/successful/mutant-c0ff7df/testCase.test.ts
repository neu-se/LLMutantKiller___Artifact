import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get dispatches with 'get' operation", () => {
  it("should retrieve a property value from a promise using Q.get", async () => {
    const obj = { foo: 42 };
    const result = await Q.get(Q(obj), "foo");
    expect(result).toBe(42);
  });
});