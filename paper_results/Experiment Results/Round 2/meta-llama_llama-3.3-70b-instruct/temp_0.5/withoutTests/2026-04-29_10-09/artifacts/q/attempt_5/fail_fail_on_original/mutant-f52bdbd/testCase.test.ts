import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections with stack trace", () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    Q.resetUnhandledRejections();
    const originalUnhandledReasons = Q.getUnhandledReasons();
    promise.catch(() => {});
    const newUnhandledReasons = Q.getUnhandledReasons();
    expect(newUnhandledReasons.length).toBeLessThan(originalUnhandledReasons.length);
    expect(originalUnhandledReasons[0]).toContain("Test error");
  });
});