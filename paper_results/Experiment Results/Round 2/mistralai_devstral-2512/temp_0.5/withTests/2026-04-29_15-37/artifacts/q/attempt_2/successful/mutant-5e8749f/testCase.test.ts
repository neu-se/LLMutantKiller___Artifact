import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should remove promise from unhandledRejections when handled", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise to trigger unhandled rejection tracking
    deferred.reject(new Error("test error"));

    // Give time for the rejection to be tracked
    await Q.delay(10);

    // Handle the rejection
    promise.catch(() => {});

    // Give time for the handler to process
    await Q.delay(10);

    // The promise should no longer be in the unhandled rejections list
    const unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
  });
});