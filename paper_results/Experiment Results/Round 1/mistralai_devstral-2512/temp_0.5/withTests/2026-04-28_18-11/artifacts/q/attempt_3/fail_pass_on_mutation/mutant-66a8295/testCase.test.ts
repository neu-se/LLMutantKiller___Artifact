const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should track unhandled rejections when tracking is enabled", () => {
    Q.resetUnhandledRejections();
    const reason = new Error("test rejection");
    Q.reject(reason);
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);
  });
});