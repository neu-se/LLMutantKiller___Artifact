const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay", () => {
  it("should handle undefined timeout by resolving immediately with undefined", (done) => {
    const startTime = Date.now();

    Q.delay("test", undefined).then((value: any) => {
      const elapsedTime = Date.now() - startTime;
      expect(value).toBeUndefined();
      expect(elapsedTime).toBeLessThan(10);
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});