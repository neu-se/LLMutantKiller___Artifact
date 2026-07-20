import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("should return false for a non-rejected promise and true for a rejected promise", () => {
    const rejectedPromise = q.reject("test");
    const nonRejectedPromise = q.resolve("test");
    expect(q.isRejected(nonRejectedPromise)).toBe(false);
    expect(q.isRejected(rejectedPromise)).toBe(true);
  });

  it("should return false for a non-promise value", () => {
    const value = "test";
    expect(q.isRejected(value)).toBe(false);
  });

  it("should return false for a non-rejected promise and true for a rejected promise when mutated code returns true for all inputs", () => {
    const rejectedPromise = q.reject("test");
    const nonRejectedPromise = q.resolve("test");
    expect(q.isRejected(nonRejectedPromise)).not.toBe(true);
    expect(q.isRejected(rejectedPromise)).not.toBe(false);
  });
});