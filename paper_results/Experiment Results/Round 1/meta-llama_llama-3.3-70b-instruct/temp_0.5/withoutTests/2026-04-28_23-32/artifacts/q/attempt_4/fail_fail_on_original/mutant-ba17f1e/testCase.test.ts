import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly handle promise rejection with a stack trace", () => {
    const error = new Error("Test rejection");
    error.stack = "at functionName (filename:123:45)";
    const promise = Q.reject(error);
    expect(promise.isRejected()).toBe(true);
    promise.catch((err) => {
      expect(err.stack).toContain("filename:123");
    });
  });
});