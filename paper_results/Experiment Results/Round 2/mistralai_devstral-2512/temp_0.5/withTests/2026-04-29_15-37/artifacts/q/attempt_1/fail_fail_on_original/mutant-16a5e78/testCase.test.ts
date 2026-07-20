import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled mutation test", () => {
  it("should correctly identify a rejected promise as not fulfilled", () => {
    const rejectedPromise = Q.reject(new Error("test error"));
    expect(Q.isFulfilled(rejectedPromise)).toBe(false);
  });
});