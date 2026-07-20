const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise rejection with done callback", (done) => {
    const promise = Q.reject(new Error("test error"));
    let errorHandled = false;

    promise.done(
      () => {},
      (err: any) => {
        errorHandled = true;
        expect(err.message).toBe("test error");
      }
    );

    // The mutation changes the promise assignment logic in done()
    // This will fail on mutated code because the promise will be set to `true`
    // causing the error handling to fail
    setTimeout(() => {
      expect(errorHandled).toBe(true);
      done();
    }, 10);
  });
});