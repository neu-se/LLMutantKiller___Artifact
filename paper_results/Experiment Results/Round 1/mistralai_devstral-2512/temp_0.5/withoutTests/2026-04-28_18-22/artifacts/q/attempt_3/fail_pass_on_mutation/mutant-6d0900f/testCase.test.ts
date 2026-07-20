const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when tracking is disabled", (done) => {
    Q.stopUnhandledRejectionTracking();
    const promise = Q.reject(new Error("test error"));
    promise.catch(() => {});
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(0);
      done();
    }, 10);
  });
});