import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections when Q.resetUnhandledRejections is called and then trackUnhandledRejections is set to true", () => {
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();
    Q.stopUnhandledRejectionTracking();
    const promise = Q.reject("Test rejection");
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).not.toEqual([]);
  });
});