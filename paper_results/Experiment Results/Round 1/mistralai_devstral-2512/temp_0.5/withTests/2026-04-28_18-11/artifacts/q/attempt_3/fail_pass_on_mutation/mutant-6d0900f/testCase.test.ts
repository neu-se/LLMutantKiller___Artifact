import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not track rejections when tracking is disabled", () => {
    Q.stopUnhandledRejectionTracking();
    Q.reject("test rejection");
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});