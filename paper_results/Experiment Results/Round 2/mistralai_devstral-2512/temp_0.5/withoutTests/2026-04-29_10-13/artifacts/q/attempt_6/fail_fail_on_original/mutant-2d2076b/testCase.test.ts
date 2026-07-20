const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay", () => {
  it("should resolve with the original value when timeout is not provided", (done) => {
    const originalValue = { data: "test" };
    const startTime = Date.now();

    Q.delay(originalValue).then((value: any) => {
      const elapsedTime = Date.now() - startTime;
      expect(value).toBe(originalValue);
      expect(elapsedTime).toBeLessThan(10);
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});