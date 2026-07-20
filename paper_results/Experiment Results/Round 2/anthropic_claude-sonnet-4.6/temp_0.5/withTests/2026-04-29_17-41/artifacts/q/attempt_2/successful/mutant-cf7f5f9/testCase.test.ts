import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

const QAny = Q as any;

describe("progress listener error forwarding to Q.onerror", () => {
  it("should invoke Q.onerror with the error thrown by a progress listener", () => {
    return new Promise<void>((resolve, reject) => {
      const theError = new Error("thrown from progress listener");
      const def = QAny.defer();

      def.promise.progress(function () {
        throw theError;
      });

      QAny.onerror = function (error: any) {
        QAny.onerror = null;
        try {
          expect(error).toBe(theError);
          resolve();
        } catch (e) {
          reject(e);
        }
      };

      const timeoutId = setTimeout(function () {
        QAny.onerror = null;
        reject(new Error("Q.onerror was never called with the thrown error"));
      }, 300);

      def.notify("progress value");
      def.resolve();

      // Clean up timeout if promise resolves/rejects
      Promise.resolve().then(() => {
        // timeout will be cleared when onerror fires or times out
      });
    });
  });
});