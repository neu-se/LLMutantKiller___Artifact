import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise progress notification", () => {
  it("should handle progress notifications correctly", (done) => {
    const deferred = Q.defer();
    let progressReceived = false;

    deferred.promise.then(
      () => {},
      () => {},
      (progress: any) => {
        progressReceived = true;
      }
    );

    deferred.notify("test progress");

    setTimeout(() => {
      expect(progressReceived).toBe(true);
      done();
    }, 10);
  });
});