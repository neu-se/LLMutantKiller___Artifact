import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener registration", () => {
  it("should register progress listeners when 'when' is called with a progress callback", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    const promise = Q.when(
      deferred.promise,
      () => {
        // Fulfillment callback
      },
      () => {
        // Rejection callback
      },
      () => {
        progressCalled = true;
      }
    );

    // Notify progress before resolving
    deferred.notify();
    deferred.resolve();

    // Give time for async operations to complete
    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});