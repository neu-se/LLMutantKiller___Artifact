import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error", () => {
  it("should re-throw error when Q.onerror is not set", (done) => {
    const theError = new Error("boo!");
    const def = (Q as any).defer();
    let caught = false;

    // setUncaughtExceptionCaptureCallback intercepts BEFORE uncaughtException event
    // This prevents Jest from seeing the error
    process.setUncaughtExceptionCaptureCallback((err: Error) => {
      process.setUncaughtExceptionCaptureCallback(null);
      if (err === theError) {
        caught = true;
      }
    });

    (Q as any).onerror = null;

    def.promise.progress(() => { throw theError; });
    def.notify(1);

    setTimeout(() => {
      process.setUncaughtExceptionCaptureCallback(null);
      (Q as any).onerror = null;
      expect(caught).toBe(true);
      done();
    }, 200);
  });
});