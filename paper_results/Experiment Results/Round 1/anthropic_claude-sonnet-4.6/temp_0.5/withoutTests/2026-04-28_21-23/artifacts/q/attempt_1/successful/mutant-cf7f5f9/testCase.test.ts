import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.onerror called when progress callback throws", () => {
  it("should call Q.onerror when a progress callback throws an error", (done) => {
    const originalOnerror = Q.onerror;
    const thrownError = new Error("progress error");
    const receivedErrors: Error[] = [];

    Q.onerror = function (err: Error) {
      receivedErrors.push(err);
    };

    const deferred = Q.defer();

    // Attach a then with a progress callback that throws
    deferred.promise.then(
      null,
      null,
      function () {
        throw thrownError;
      }
    );

    // Notify progress to trigger the progress callback
    deferred.notify("progress value");

    // Give async operations time to complete
    setTimeout(function () {
      Q.onerror = originalOnerror;
      try {
        expect(receivedErrors.length).toBe(1);
        expect(receivedErrors[0]).toBe(thrownError);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});