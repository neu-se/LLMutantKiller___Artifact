import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress notification", () => {
  it("should notify progress listeners when progress is made", (done) => {
    let progressCalled = false;
    const deferred = Q.defer();

    deferred.promise.then(
      () => {
        expect(progressCalled).toBe(true);
        done();
      },
      () => {
        expect(true).toBe(false);
        done();
      },
      (progressValue) => {
        progressCalled = true;
        expect(progressValue).toBe("test");
      }
    );

    deferred.notify("test");
    deferred.resolve();
  });
});