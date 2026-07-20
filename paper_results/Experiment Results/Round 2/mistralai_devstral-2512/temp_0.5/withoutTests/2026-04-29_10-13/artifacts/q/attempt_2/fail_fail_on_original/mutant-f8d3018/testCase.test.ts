import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handler", () => {
  it("should call the progress handler when provided", (done) => {
    let progressCalled = false;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      (progress: any) => {
        progressCalled = true;
        return progress;
      }
    );

    deferred.notify("test");
    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});