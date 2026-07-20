import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.done error propagation", () => {
  it("should call Q.onerror when a rejected promise has done() called with no errback", (done) => {
    const error = new Error("test rejection error");
    const q = Q as any;
    const originalOnerror = q.onerror;
    let resolved = false;

    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        q.onerror = originalOnerror;
        done(new Error("Q.onerror was never called; the error was silently swallowed"));
      }
    }, 300);

    q.onerror = function (err: any) {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeoutId);
        q.onerror = originalOnerror;
        try {
          expect(err).toBe(error);
          done();
        } catch (e) {
          done(e);
        }
      }
    };

    Q.reject(error).done();
  });
});