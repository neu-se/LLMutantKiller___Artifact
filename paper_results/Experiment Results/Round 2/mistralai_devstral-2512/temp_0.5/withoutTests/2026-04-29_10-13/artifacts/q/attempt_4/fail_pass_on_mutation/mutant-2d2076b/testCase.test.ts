const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay", () => {
  it("should handle undefined timeout by resolving immediately", (done) => {
    const originalValue = "test";
    const startTime = Date.now();

    Q.delay(originalValue, undefined).then((value: any) => {
      const elapsedTime = Date.now() - startTime;
      expect(elapsedTime).toBeLessThan(10);
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});