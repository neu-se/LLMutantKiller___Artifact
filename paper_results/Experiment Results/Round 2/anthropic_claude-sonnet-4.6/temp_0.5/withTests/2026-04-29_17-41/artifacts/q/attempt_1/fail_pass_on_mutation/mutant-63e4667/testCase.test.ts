import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should return the own property keys of a fulfilled object without extra arguments", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = await Q(obj).keys();
    expect(keys.sort()).toEqual(["a", "b", "c"]);
  });
});