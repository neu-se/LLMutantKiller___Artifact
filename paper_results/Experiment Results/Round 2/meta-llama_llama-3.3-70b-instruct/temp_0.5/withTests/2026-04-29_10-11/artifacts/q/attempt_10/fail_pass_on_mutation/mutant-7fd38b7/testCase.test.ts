import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections after multiple resets", () => {
    q.resetUnhandledRejections();
    q.reject("test");
    q.resetUnhandledRejections();
    q.reject("test2");
    q.resetUnhandledRejections();
    q.reject("test3");
    const reasons = q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    q.resetUnhandledRejections();
    expect(q.getUnhandledReasons()).toEqual([]);
  });
});