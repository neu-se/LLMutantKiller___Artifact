const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay behavior with undefined timeout", () => {
  it("should resolve with the input value when timeout is undefined", (done) => {
    const testValue = "test";
    Q.delay(testValue, undefined).then((value: unknown) => {
      // In the original code, this should resolve immediately with the input value
      // In the mutated code, this behavior changes
      expect(value).toBe(testValue);
      done();
    }).catch((error: unknown) => {
      done(error as Error);
    });
  });
});