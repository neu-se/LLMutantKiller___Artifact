import { Q } from "./q.js";

describe("Promise progress notification", () => {
  it("should notify progress listeners when progress is made", (done) => {
    const deferred = Q.defer();
    let progressValue: number | undefined;

    deferred.promise.then(
      () => {},
      () => {},
      (value) => {
        progressValue = value;
      }
    );

    // Simulate progress
    deferred.notify(42);

    // Use setTimeout to allow the progress handler to execute
    setTimeout(() => {
      expect(progressValue).toBe(42);
      done();
    }, 10);
  });
});