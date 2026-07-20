import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.get", () => {
  it("should retrieve a property value from a fulfilled promise using the 'get' operation", async () => {
    const obj = { foo: 42, bar: "hello" };
    const result = await Q(obj).get("foo");
    expect(result).toBe(42);
  });
});