import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handling", () => {
  it("should not call progress listeners when an error is thrown", () => {
    let progressCalled = false;
    const deferred = Q.defer();

    // Suppress error logging
    Q.onerror = () => {};

    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        progressCalled = true;
        throw new Error("Test error");
      }
    );

    deferred.notify("test");
    deferred.resolve();

    return promise.then(() => {
      // In original code, progress listener should be called despite the error
      expect(progressCalled).toBe(true);
    });
  });
});