import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the fulfillment value when state is fulfilled", () => {
    const promise = Q(42);
    expect(promise.valueOf()).toBe(42);
  });
});