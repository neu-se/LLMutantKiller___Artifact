import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handling", () => {
  it("should not call progress listeners when notify throws an error", () => {
    let progressCalled = false;
    const deferred = Q.defer();

    Q.onerror = () => {}; // Suppress error logging

    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        progressCalled = true;
        throw new Error("Progress error");
      }
    );

    deferred.notify("test");
    deferred.resolve();

    return promise.then(() => {
      expect(progressCalled).toBe(true);
    });
  });
});