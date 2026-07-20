import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
  it("should call Q.onerror with the error thrown by a progress listener", () => {
    return new Promise<void>((resolve, reject) => {
      const theError = new Error("progress listener error");
      const def = Q.defer();

      def.promise.progress(function () {
        throw theError;
      });

      let onerrorCalled = false;
      let receivedError: unknown = null;

      Q.onerror = function (error: unknown) {
        onerrorCalled = true;
        receivedError = error;
      };

      def.notify("some progress");

      // Give the async machinery time to process
      setTimeout(function () {
        Q.onerror = null;
        if (!onerrorCalled) {
          reject(new Error("Q.onerror was not called"));
        } else if (receivedError !== theError) {
          reject(new Error("Q.onerror was called with wrong error: " + receivedError));
        } else {
          resolve();
        }
      }, 100);
    });
  });
});