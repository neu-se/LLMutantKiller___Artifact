import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isFulfilled method", () => {
  it("should return true for a fulfilled promise", () => {
    const fulfilledPromise = Q(42);
    expect(fulfilledPromise.isFulfilled()).toBe(true);
  });
});