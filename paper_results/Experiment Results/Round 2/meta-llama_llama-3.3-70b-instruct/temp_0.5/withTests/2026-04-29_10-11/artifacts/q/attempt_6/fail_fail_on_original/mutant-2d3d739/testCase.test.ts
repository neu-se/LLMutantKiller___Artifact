import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create a promise", () => {
    // Create a promise
    const promise = Q(10);

    // Check if the promise is fulfilled
    expect(promise.isFulfilled()).toBe(true);
  });
});