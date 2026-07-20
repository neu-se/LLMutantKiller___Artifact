const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should handle progress notifications with error propagation", (done) => {
    const deferred = Q.defer();
    let progressErrorHandled = false;

    // Set up a custom error handler
    const originalOnerror = Q.onerror;
    Q.onerror = (error: any) => {
      if (error.message === "Test progress error") {
        progressErrorHandled = true;
      }
    };

    deferred.promise.then(
      () => {},
      () => {},
      (progress: number) => {
        throw new Error("Test progress error");
      }
    );

    deferred.notify(42);

    setTimeout(() => {
      Q.onerror = originalOnerror;
      expect(progressErrorHandled).toBe(true);
      done();
    }, 10);
  });
});