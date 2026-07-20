import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.dispatch", () => {
  it("should dispatch an operation on an object and return the result", async () => {
    const obj = { foo: 42 };
    const result = await Q(obj).dispatch("get", ["foo"]);
    expect(result).toBe(42);
  });
});