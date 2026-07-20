import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track rejections when tracking is enabled", () => {
    Q.resetUnhandledRejections();
    Q.reject("test rejection");
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);
  });
});