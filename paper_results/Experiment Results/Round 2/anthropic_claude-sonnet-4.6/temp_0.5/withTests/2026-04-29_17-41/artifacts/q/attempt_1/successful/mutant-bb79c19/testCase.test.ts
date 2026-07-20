import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
  it("should return the fulfilled value of a fulfilled promise, not the promise itself", () => {
    const fulfilledValue = 42;
    const promise = Q.fulfill(fulfilledValue);
    const result = Q.nearer(promise);
    expect(result).toBe(fulfilledValue);
  });
});