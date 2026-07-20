import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return a promise that resolves to the keys of an object", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = Q.keys(obj);
    expect(Q.isPromise(result)).toBe(true);
    const keys = await result;
    expect(keys.sort()).toEqual(["a", "b", "c"]);
  });
});