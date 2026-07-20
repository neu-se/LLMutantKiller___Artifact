import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections when trackUnhandledRejections is true after Q.resetUnhandledRejections", () => {
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();
    Q.stopUnhandledRejectionTracking();
    const promise = Q.reject("Test rejection");
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).not.toEqual([]);
    Q.resetUnhandledRejections();
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});