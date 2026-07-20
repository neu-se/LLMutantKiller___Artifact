import { Q } from "./q.js";

describe("Q.dispatch", () => {
  it("should dispatch a message to an object and return a promise", () => {
    const obj = { value: 42 };
    const result = Q.dispatch(obj, "get", ["value"]);
    return result.then((value) => {
      expect(value).toBe(42);
    });
  });
});