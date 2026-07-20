import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
  it("should call Q.onerror with the error thrown by a progress listener", (done) => {
    const theError = new Error("progress listener error");
    const def = Q.defer();

    def.promise.progress(function () {
      throw theError;
    });

    Q.onerror = function (error: any) {
      expect(error).toBe(theError);
      Q.onerror = null;
      done();
    };

    // Set a timeout to fail the test if Q.onerror is never called
    const timeout = setTimeout(function () {
      Q.onerror = null;
      done(new Error("Q.onerror was never called with the thrown error"));
    }, 500);

    def.promise.progress(function () {
      // second listener to ensure we don't block
    });

    def.notify("value");
    def.resolve();
  });
});