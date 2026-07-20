import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("should return false for a non-promise value", () => {
    const value = "test";
    expect(Q.isRejected(value)).toBe(false);
  });

  it("should return false for a non-rejected promise", () => {
    const promise = Q("test");
    expect(Q.isRejected(promise)).toBe(false);
  });

  it("should return true for a rejected promise", () => {
    const promise = Q.reject("test");
    expect(Q.isRejected(promise)).toBe(true);
  });
});