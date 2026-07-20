import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise progress notification", () => {
  it("should notify progress listeners when progress is made", (done) => {
    let progressCalled = false;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      (progress: any) => {
        progressCalled = true;
        expect(progress).toBe("working");
      }
    );

    deferred.notify("working");

    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});