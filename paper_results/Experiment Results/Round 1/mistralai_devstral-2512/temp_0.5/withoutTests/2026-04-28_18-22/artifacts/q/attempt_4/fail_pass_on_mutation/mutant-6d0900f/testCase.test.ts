const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track rejections when tracking is enabled", (done) => {
    Q.resetUnhandledRejections();
    const promise = Q.reject(new Error("test error"));
    setTimeout(() => {
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBeGreaterThan(0);
      done();
    }, 10);
  });
});