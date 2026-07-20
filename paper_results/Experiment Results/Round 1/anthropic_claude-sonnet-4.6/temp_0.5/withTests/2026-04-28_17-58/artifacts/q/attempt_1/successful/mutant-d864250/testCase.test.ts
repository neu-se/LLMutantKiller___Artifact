import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill set operation", () => {
  it("should set a property on the underlying object when using Q.set", async () => {
    const object: { a?: number } = {};
    const result = await Q(object).set("a", 1);
    expect(result).toBe(undefined);
    expect(object.a).toBe(1);
  });
});