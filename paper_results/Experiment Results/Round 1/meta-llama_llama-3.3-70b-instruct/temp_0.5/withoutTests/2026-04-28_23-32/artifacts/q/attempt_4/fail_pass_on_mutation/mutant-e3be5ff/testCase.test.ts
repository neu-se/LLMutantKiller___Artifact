import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reset unhandled rejections when Q.resetUnhandledRejections is called", () => {
    Q.stopUnhandledRejectionTracking();
    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons()).toEqual([]);
    Q.stopUnhandledRejectionTracking();
    expect(Q.getUnhandledReasons()).toEqual([]);
    Q.resetUnhandledRejections();
    const promise = Q.reject("Test rejection");
    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});