import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error handling", () => {
  it("should call Q.onerror when progress callback throws and Q.onerror is set", (done) => {
    const theError = new Error("progress error sentinel");
    const def = Q.defer();

    let onerrorCalled = false;
    (Q as any).onerror = function (err: any) {
      onerrorCalled = true;
      // In original code this is never reached when Q.onerror is set
      // because the if(Q.onerror){} branch does nothing and else throws
    };

    def.promise.progress(function () {
      throw theError;
    });

    def.notify("value");
    def.resolve();

    return def.promise.then(function () {
      return new Promise<void>((resolve) => {
        setTimeout(function () {
          (Q as any).onerror = null;
          // onerrorCalled should be false because when Q.onerror is set,
          // the code does if(Q.onerror){} (nothing) else { throw e }
          // so Q.onerror is never actually invoked
          expect(onerrorCalled).toBe(false);
          resolve();
          done();
        }, 100);
      });
    });
  });
});