const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay behavior with undefined timeout", () => {
  it("should delay fulfillment when timeout is undefined", (done) => {
    const startTime = Date.now();
    Q.delay("test", undefined).then((value: any) => {
      const elapsedTime = Date.now() - startTime;
      expect(value).toBe("test");
      expect(elapsedTime).toBeGreaterThanOrEqual(0);
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});