import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress notification", () => {
  it("should correctly dispatch progress notifications", (done) => {
    const deferred = Q.defer();
    let progressValue: unknown = null;

    deferred.promise.then(
      () => {},
      () => {},
      (value: unknown) => {
        progressValue = value;
      }
    );

    // Notify with a specific value
    deferred.notify("test-progress");

    // Use setTimeout to allow the progress handler to execute
    setTimeout(() => {
      expect(progressValue).toBe("test-progress");
      done();
    }, 10);
  });
});