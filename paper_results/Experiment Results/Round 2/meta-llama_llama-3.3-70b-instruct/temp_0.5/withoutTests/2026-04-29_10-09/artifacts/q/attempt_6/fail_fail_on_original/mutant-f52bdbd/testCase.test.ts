import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections", () => {
    const promise = Q.reject(new Error("Test error"));
    const originalUnhandledReasons = Q.getUnhandledReasons();
    expect(originalUnhandledReasons.length).toBe(0);
    Q.resetUnhandledRejections();
    promise.catch(() => {});
    const newUnhandledReasons = Q.getUnhandledReasons();
    expect(newUnhandledReasons.length).toBe(0);
    const error = new Error("Test error");
    const promise2 = Q.reject(error);
    const originalUnhandledReasons2 = Q.getUnhandledReasons();
    expect(originalUnhandledReasons2.length).toBe(0);
    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons()[0]).toContain("Test error");
  });
});