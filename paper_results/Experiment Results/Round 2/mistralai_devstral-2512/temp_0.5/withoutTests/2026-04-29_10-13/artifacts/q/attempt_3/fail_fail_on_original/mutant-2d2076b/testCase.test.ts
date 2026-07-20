const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay", () => {
  it("should resolve immediately when timeout is undefined", (done) => {
    const originalValue = "test";
    const startTime = Date.now();

    Q.delay(originalValue, undefined).then((value: any) => {
      const elapsedTime = Date.now() - startTime;
      expect(value).toBe(originalValue);
      expect(elapsedTime).toBeLessThan(10); // Should resolve immediately
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});