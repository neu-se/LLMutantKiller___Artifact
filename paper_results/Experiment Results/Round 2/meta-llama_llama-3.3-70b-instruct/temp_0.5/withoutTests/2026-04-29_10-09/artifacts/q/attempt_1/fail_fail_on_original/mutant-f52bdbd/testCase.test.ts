import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const promise = Q.reject(new Error("Test error"));
    const originalUnhandledReasons = Q.getUnhandledReasons();
    promise.catch(() => {});
    Q.resetUnhandledRejections();
    const newUnhandledReasons = Q.getUnhandledReasons();
    expect(newUnhandledReasons.length).toBeLessThan(originalUnhandledReasons.length);
  });
});