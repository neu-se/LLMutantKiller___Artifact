import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should return true for a fulfilled promise", () => {
    const promise = Q.resolve(true);
    expect(promise.isFulfilled()).toBe(true);
  });
});