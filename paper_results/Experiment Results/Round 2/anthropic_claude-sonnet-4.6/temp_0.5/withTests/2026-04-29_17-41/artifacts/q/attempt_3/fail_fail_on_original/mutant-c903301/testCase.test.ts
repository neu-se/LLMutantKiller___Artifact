import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error handling", () => {
  it("should invoke Q.onerror when a progress callback throws", (done) => {
    const theError = new Error("boo from progress");
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
      done(new Error("Q.onerror was never called - error was silently swallowed"));
    }, 300);

    def.notify("value");
    def.resolve();
  });
});