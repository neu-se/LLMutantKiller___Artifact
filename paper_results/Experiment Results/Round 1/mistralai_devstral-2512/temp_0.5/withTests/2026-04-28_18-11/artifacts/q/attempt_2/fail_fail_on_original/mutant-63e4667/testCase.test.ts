import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should return the object's own enumerable property names", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const keys = await promise.dispatch("keys", []);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});