import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handling", () => {
  it("should call progress listeners when notify does not throw an error", () => {
    let progressCalled = false;
    const deferred = Q.defer();

    const promise = deferred.promise.then(
      () => {},
      () => {},
      () => {
        progressCalled = true;
      }
    );

    deferred.notify("test");
    deferred.resolve();

    return promise.then(() => {
      expect(progressCalled).toBe(true);
    });
  });
});