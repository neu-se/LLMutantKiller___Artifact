import { Q } from "./q.js";

describe("Q.delete", () => {
  it("should dispatch delete operation and return a promise", () => {
    const obj = { key: "value" };
    const promise = Q.delete(obj, "key");
    expect(promise).toBeInstanceOf(Q);
    // Verify the promise is for the delete operation result
    return promise.then(result => {
      expect(result).toBeUndefined();
    });
  });
});