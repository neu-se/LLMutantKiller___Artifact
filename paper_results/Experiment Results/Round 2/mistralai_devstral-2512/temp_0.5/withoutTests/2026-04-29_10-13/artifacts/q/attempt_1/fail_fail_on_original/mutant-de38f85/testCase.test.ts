import { Q } from "./q.js";

describe("Q.keys mutation test", () => {
  it("should correctly dispatch the 'keys' operation", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const keysPromise = promise.keys();

    // The keys() method should return a promise that resolves to the keys of the object
    await expect(keysPromise).resolves.toEqual(["a", "b", "c"]);
  });
});