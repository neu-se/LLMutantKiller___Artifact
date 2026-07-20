import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error handling", () => {
  it("should call Q.onerror when a progress callback throws and Q.onerror is set", (done) => {
    const theError = new Error("boo!");
    const def = Q.defer();

    def.promise.progress(function () {
      throw theError;
    });

    const timeoutId = setTimeout(function () {
      (Q as any).onerror = null;
      done(new Error("Q.onerror was never called - error was silently swallowed"));
    }, 200);

    (Q as any).onerror = function (error: Error) {
      clearTimeout(timeoutId);
      (Q as any).onerror = null;
      expect(error).toBe(theError);
      done();
    };

    def.notify(1);
    def.resolve();
  });
});