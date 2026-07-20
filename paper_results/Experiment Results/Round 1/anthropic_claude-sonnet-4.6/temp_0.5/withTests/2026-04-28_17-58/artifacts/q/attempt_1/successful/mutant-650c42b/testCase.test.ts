import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
  it("should dispatch a get operation on an object through Q.master", async () => {
    const obj = { foo: 42 };
    const masterPromise = Q.master(obj);
    const result = await masterPromise.dispatch("get", ["foo"]);
    expect(result).toBe(42);
  });
});