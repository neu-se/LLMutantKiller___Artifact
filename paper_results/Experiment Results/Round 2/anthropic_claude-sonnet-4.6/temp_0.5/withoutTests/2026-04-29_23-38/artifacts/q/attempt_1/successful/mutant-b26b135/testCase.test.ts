import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return the keys of a fulfilled promise's value", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const keys = await Q.keys(promise);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});