import { Q } from "./q.js";

describe("Q.keys mutation test", () => {
  it("should correctly dispatch the 'keys' operation", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);

    // The original code should dispatch "keys" operation
    // The mutated code dispatches "" operation which should fail
    return promise.keys().then((keys) => {
      // Should get the keys of the object
      expect(keys).toEqual(["a", "b", "c"]);
    });
  });
});