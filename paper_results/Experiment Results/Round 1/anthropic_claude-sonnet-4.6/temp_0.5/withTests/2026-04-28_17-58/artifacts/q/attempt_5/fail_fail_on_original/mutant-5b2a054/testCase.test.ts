import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done error handling", () => {
  it("calls Q.onerror when a done promise is rejected", (done) => {
    const qAny = Q as any;
    const originalOnerror = qAny.onerror;
    const testError = new Error("rejection reason");

    qAny.onerror = function (err: unknown) {
      qAny.onerror = originalOnerror;
      expect(err).toBe(testError);
      done();
    };

    Q.reject(testError).done();

    setTimeout(function () {
      qAny.onerror = originalOnerror;
      done(new Error("Q.onerror was never called"));
    }, 500);
  });
});