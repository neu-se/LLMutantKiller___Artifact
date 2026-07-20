import { Q } from "./q.js";

describe("Promise.isRejected", () => {
  it("should return true for a rejected promise", () => {
    const rejectedPromise = Q.reject(new Error("Test error"));
    expect(rejectedPromise.isRejected()).toBe(true);
  });
});