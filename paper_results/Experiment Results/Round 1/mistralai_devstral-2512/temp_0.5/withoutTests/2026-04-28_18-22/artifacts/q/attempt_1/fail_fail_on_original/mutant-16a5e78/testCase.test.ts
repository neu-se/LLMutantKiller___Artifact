import { Q } from "./q.js";

describe("Q.isFulfilled mutation test", () => {
  it("should correctly identify a fulfilled promise", () => {
    const fulfilledPromise = Q.resolve(42);
    expect(Q.isFulfilled(fulfilledPromise)).toBe(true);
  });
});