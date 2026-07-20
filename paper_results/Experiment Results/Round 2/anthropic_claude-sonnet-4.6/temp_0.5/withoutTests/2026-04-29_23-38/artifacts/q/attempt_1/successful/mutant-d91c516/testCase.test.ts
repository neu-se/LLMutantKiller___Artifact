import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return a promise for the keys of an object", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = await Q.keys(obj);
    expect(result).toEqual(expect.arrayContaining(["a", "b", "c"]));
    expect(result.length).toBe(3);
  });
});