import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly determine if a promise is fulfilled", () => {
    const promise = q.Q(true);
    expect(promise.isFulfilled()).toBe(true);
  });
});