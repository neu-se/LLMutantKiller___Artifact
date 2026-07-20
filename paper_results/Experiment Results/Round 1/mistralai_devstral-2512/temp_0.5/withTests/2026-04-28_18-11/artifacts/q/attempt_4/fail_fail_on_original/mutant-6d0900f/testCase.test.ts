import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track rejections when tracking is enabled and stop when disabled", () => {
    Q.resetUnhandledRejections();
    Q.reject("first rejection");
    expect(Q.getUnhandledReasons().length).toBe(1);

    Q.stopUnhandledRejectionTracking();
    Q.reject("second rejection");
    expect(Q.getUnhandledReasons().length).toBe(1);
  });
});