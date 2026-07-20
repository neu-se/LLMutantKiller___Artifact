const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should properly terminate promise chain and handle errors", (done) => {
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // This should trigger the error handling in .done()
    promise.done(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (err: Error) => {
        expect(err).toBe(error);
        done();
      }
    );
  });
});