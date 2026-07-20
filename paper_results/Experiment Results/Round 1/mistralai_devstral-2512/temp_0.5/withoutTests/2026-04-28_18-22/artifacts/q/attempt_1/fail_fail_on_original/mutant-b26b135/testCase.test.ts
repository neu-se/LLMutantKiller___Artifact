import { Q } from "./q.js";

describe("Q.fulfill keys method", () => {
  it("should return object keys when keys method is called on fulfilled promise", async () => {
    const testObject = { a: 1, b: 2, c: 3 };
    const promise = Q.fulfill(testObject);
    const keys = await promise.dispatch("keys", []);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});