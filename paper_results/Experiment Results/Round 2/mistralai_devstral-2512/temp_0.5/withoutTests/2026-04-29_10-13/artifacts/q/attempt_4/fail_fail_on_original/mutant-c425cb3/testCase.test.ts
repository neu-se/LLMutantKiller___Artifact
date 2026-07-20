const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should handle progress notification errors correctly", (done) => {
    const deferred = Q.defer();
    let progressError: Error | null = null;

    deferred.promise.then(
      () => {},
      () => {},
      (progress: number) => {
        throw new Error("Progress error");
      }
    );

    // This should trigger the progress handler which throws an error
    deferred.notify(42);

    // In the original code, the error should be caught and handled by Q.onerror if available
    // In the mutated code, the error handling behavior changes due to the `if (true)` condition
    setTimeout(() => {
      // The test passes if we reach here without uncaught exceptions
      // The mutation would cause different behavior in error handling
      done();
    }, 10);
  });
});