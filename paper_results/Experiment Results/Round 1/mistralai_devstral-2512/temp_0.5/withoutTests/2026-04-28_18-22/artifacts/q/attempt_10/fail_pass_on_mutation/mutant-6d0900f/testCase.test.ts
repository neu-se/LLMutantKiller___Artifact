const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when tracking is disabled", (done) => {
    Q.stopUnhandledRejectionTracking();
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));
    Q.nextTick(() => {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(0);
      done();
    });
  });
});