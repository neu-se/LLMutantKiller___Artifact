import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.set", () => {
  it("should set a property on the object and fulfill with undefined", async () => {
    const object: { a?: number } = {};
    const result = await Q(object).set("a", 1);
    expect(result).toBe(undefined);
    expect(object.a).toBe(1);
  });
});