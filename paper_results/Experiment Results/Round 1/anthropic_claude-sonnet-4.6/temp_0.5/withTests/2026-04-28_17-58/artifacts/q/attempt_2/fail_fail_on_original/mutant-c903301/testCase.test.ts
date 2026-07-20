import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error re-throw", () => {
  it("should re-throw errors from progress callbacks to process when Q.onerror is not set", (done) => {
    const theError = new Error("progress error sentinel");
    const def = Q.defer();

    (Q as any).onerror = null;

    def.promise.progress(function () {
      throw theError;
    });

    const originalListeners = process.listeners("uncaughtException").slice();
    process.removeAllListeners("uncaughtException");

    let finished = false;

    process.once("uncaughtException", function (err) {
      originalListeners.forEach((l: any) => process.on("uncaughtException", l));
      if (!finished) {
        finished = true;
        expect(err).toBe(theError);
        done();
      }
    });

    setTimeout(function () {
      if (!finished) {
        finished = true;
        originalListeners.forEach((l: any) => process.on("uncaughtException", l));
        done(new Error("Expected error to propagate but it was swallowed"));
      }
    }, 300);

    def.notify("value");
    def.resolve();
  });
});