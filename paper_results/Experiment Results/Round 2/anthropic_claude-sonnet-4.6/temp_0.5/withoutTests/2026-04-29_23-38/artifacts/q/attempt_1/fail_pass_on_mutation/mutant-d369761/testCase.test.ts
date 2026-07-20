import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys behavior", () => {
  it("should return the keys of a fulfilled object", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = await Q(obj).keys();
    expect(keys.sort()).toEqual(["a", "b", "c"]);
  });
});