import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should return true for a fulfilled promise", () => {
    const promise = Q.resolve(true);
    expect(promise.isFulfilled()).toBeTruthy();
    const promise2 = Q.resolve(false);
    expect(promise2.isFulfilled()).toBeTruthy();
  });
});