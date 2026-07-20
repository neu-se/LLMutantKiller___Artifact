import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior with progress callback", () => {
  it("should not throw when only progress callback is provided", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    // Set up a progress callback
    const progress = (value: any) => {
      progressCalled = true;
    };

    // Call done with only progress callback
    deferred.promise.done(undefined, undefined, progress);

    // Notify progress
    deferred.notify("test");

    // Give time for async operations
    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});