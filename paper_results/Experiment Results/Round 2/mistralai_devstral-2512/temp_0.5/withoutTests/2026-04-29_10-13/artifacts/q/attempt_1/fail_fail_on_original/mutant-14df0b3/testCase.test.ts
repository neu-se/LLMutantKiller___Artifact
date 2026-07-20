import { Q } from "./q.js";

describe("Q.delete", () => {
  it("should dispatch a delete operation and return a promise", () => {
    const obj = { key: "value" };
    const promise = Q.delete(obj, "key");
    expect(promise).toBeInstanceOf(Q.makePromise());
    // Verify that the dispatch was called with the correct operation
    return promise.then(function() {
      // The key should be deleted from the object
      expect(obj).not.toHaveProperty("key");
    });
  });
});