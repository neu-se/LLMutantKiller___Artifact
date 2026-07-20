import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
  it("should dispatch an operation on an object and return a promise with the result", async () => {
    const obj = { foo: 42 };
    const result = await Q(obj).dispatch("get", ["foo"]);
    expect(result).toBe(42);
  });
});