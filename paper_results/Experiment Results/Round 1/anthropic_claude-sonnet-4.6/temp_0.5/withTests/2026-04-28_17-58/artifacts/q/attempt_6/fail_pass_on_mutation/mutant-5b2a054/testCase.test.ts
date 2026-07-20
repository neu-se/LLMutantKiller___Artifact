import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done error handling", () => {
  it("calls Q.onerror when a done promise is rejected", () => {
    return new Promise<void>((resolve, reject) => {
      const qAny = Q as any;
      const originalOnerror = qAny.onerror;
      const testError = new Error("rejection reason");
      const timeoutId = setTimeout(function () {
        qAny.onerror = originalOnerror;
        reject(new Error("Q.onerror was never called"));
      }, 500);

      qAny.onerror = function (err: unknown) {
        clearTimeout(timeoutId);
        qAny.onerror = originalOnerror;
        try {
          expect(err).toBe(testError);
          resolve();
        } catch (e) {
          reject(e);
        }
      };

      Q.reject(testError).done();
    });
  });
});