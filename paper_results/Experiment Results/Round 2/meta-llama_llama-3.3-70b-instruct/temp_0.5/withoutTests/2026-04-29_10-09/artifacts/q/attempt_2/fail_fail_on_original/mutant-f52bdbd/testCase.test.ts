import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections with stack trace", () => {
    const promise = Q.reject(new Error("Test error"));
    const originalUnhandledReasons = Q.getUnhandledReasons();
    Q.resetUnhandledRejections();
    expect(originalUnhandledReasons[0]).toContain("Test error");
  });
});