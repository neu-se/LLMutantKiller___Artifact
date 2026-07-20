import { Q } from "./q.js";

describe("Q.keys", () => {
  it("should return a promise for the keys of the object", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = await Q.keys(obj);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});