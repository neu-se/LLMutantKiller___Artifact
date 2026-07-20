import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reset unhandled rejections when Q.resetUnhandledRejections is called", () => {
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();
    const promise = Q.reject("Test rejection");
    expect(Q.getUnhandledReasons()).toEqual([]);
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});