import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error", () => {
  it("should call Q.onerror with thrown error from progress callback", (done) => {
    const theError = new Error("boo!");
    const def = (Q as any).defer();
    let errorReceived: Error | null = null;

    (Q as any).onerror = function (err: Error) {
      errorReceived = err;
    };

    def.promise.progress(function () {
      throw theError;
    });

    def.notify();
    def.resolve();

    setTimeout(function () {
      (Q as any).onerror = null;
      expect(errorReceived).toBe(theError);
      done();
    }, 100);
  });
});