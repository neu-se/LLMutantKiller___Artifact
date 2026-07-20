import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys() method", () => {
  it("should return promise for object keys", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const keys = await promise.keys();
    expect(keys).toEqual(["a", "b", "c"]);
  });
});