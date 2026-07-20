import { Q } from "./q.js";

describe("Q promise progress notification", () => {
  it("should notify progress listeners when progress is reported", (done) => {
    let progressNotified = false;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      (progress) => {
        progressNotified = true;
      }
    );

    // Simulate progress notification
    deferred.notify("test progress");

    // Use setTimeout to allow the progress notification to be processed
    setTimeout(() => {
      expect(progressNotified).toBe(true);
      done();
    }, 10);
  });
});