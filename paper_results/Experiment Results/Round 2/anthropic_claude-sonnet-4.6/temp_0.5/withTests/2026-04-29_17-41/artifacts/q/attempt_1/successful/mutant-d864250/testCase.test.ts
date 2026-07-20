import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill set operation", () => {
  it("should set a property on an object when using Q set dispatch", async () => {
    const object: { a?: number } = {};
    const result = await Q(object).set("a", 1);
    expect(object.a).toBe(1);
  });
});