const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise constructor", () => {
  it("should accept a resolver function and resolve with the resolved value", (done) => {
    const expectedValue = "resolved";
    const promise = new Q.Promise((resolve: (value: string) => void) => {
      resolve(expectedValue);
    });

    promise.then((value: string) => {
      expect(value).toBe(expectedValue);
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});