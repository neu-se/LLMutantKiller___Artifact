import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly determine if a promise is fulfilled", () => {
    const promise = Q.resolve(true);
    expect(promise.isFulfilled()).toBe(true);
  });
});