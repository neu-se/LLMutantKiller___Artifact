import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error handling", () => {
  it("should call Q.onerror when a progress callback throws and Q.onerror is set", (done) => {
    const theError = new Error("boo!");
    const def = Q.defer();

    def.promise.progress(function () {
      throw theError;
    });

    (Q as any).onerror = function (error: Error) {
      expect(error).toBe(theError);
      (Q as any).onerror = null;
      done();
    };

    setTimeout(function () {
      (Q as any).onerror = null;
      done(new Error("Q.onerror was never called"));
    }, 200);

    def.notify(1);
    def.resolve();
  });
});