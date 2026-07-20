const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with error handling", () => {
  it("should properly handle promise rejection with error callback", (done) => {
    const promise = Q.reject(new Error("test error"));
    let caughtError: Error | null = null;

    promise.done(null, (error: Error) => {
      caughtError = error;
    });

    setTimeout(() => {
      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError?.message).toBe("test error");
      done();
    }, 10);
  });
});