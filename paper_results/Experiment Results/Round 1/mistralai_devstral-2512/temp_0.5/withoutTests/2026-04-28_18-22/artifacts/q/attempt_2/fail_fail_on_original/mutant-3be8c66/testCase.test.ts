import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for a fulfilled promise", () => {
    const fulfilledPromise = Q.resolve(42);
    expect(Q.isFulfilled(fulfilledPromise)).toBe(true);
  });
});