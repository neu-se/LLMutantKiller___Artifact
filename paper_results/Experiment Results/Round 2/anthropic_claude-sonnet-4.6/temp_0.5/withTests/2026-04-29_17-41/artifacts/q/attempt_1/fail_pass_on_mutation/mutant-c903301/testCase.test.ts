import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error handling without Q.onerror", () => {
  it("should re-throw errors from progress callbacks to Q.onerror when Q.onerror is set", () => {
    return new Promise<void>((resolve, reject) => {
      const theError = new Error("progress error");
      const def = Q.defer();

      def.promise.progress(function () {
        throw theError;
      });

      const caughtErrors: Error[] = [];
      Q.onerror = function (error: Error) {
        caughtErrors.push(error);
      };

      const resultDeferred = Q.defer();
      Q.onerror = function (error: Error) {
        caughtErrors.push(error);
        // After catching the error, resolve
        resultDeferred.resolve();
      };

      // Set a timeout to reject if onerror is never called
      const timeout = setTimeout(() => {
        resultDeferred.reject(new Error("Q.onerror was never called - error was swallowed"));
      }, 500);

      resultDeferred.promise.then(
        function () {
          clearTimeout(timeout);
          expect(caughtErrors.length).toBe(1);
          expect(caughtErrors[0]).toBe(theError);
          Q.onerror = null;
          resolve();
        },
        function (err: Error) {
          clearTimeout(timeout);
          Q.onerror = null;
          reject(err);
        }
      );

      def.notify("test");
      def.resolve();
    });
  });
});