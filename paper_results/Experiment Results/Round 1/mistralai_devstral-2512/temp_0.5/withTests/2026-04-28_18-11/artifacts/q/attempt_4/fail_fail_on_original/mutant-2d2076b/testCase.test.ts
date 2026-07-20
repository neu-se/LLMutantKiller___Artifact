const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay behavior with undefined timeout", () => {
  it("should delay fulfillment when timeout is undefined", (done) => {
    const promise = Q.delay(undefined);
    expect(promise).toBeInstanceOf(Q.Promise);
    promise.then(() => {
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});