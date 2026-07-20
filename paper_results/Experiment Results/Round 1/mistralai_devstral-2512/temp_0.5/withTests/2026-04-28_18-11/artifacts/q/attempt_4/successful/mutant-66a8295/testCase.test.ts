const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not track unhandled rejections when tracking is disabled", () => {
    Q.stopUnhandledRejectionTracking();
    const reason = new Error("test rejection");
    Q.reject(reason);
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});