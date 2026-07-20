import { Q } from "./q.js";

describe("Q.fulfill keys method", () => {
  it("should return the keys of the fulfilled value", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q.fulfill(obj);
    const keys = await promise.keys();
    expect(keys).toEqual(["a", "b", "c"]);
  });
});