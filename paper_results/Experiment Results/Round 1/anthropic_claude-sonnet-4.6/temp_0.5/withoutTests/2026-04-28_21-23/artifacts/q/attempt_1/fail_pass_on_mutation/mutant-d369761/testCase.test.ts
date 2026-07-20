import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys behavior", () => {
  it("should return the keys of a fulfilled object value", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keysPromise = Q.keys(obj);
    const keys = await keysPromise;
    expect(keys).toEqual(expect.arrayContaining(["a", "b", "c"]));
    expect(keys.length).toBe(3);
  });
});