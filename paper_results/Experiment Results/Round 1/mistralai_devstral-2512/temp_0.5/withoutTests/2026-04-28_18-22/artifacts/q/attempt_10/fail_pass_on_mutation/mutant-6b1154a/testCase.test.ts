const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with progress callback", () => {
  it("should return the promise when any callback is provided", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    // Test with fulfilled callback
    const result1 = deferred.promise.done(() => {}, undefined, undefined);
    expect(result1).toBeUndefined();

    // Test with rejected callback
    const result2 = deferred.promise.done(undefined, () => {}, undefined);
    expect(result2).toBeUndefined();

    // Test with progress callback
    const result3 = deferred.promise.done(undefined, undefined, (value: any) => {
      progressCalled = true;
    });
    expect(result3).toBeUndefined();

    // Test with multiple callbacks
    const result4 = deferred.promise.done(() => {}, () => {}, (value: any) => {
      progressCalled = true;
    });
    expect(result4).toBeUndefined();

    // Notify progress
    deferred.notify("test");

    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});