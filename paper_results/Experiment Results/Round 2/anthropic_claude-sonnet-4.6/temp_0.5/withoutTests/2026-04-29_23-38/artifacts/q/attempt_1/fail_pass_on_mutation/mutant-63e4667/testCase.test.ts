import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should return the keys of a fulfilled object promise", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = await Q(obj).keys();
    expect(keys).toEqual(expect.arrayContaining(["a", "b", "c"]));
    expect(keys.length).toBe(3);
  });
});