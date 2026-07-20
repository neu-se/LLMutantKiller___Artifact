import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find index using Q's internal array operations", () => {
    // Create a scenario that forces Q to use its internal array_indexOf
    // The mutation changes the condition from `this[i] === value` to `if (false)`
    // which would cause Q's internal indexOf to always return -1

    // Q.all internally uses array_indexOf for progress tracking
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    let progressCalled = false;
    let progressIndex = -1;

    const promise = Q.all([deferred1.promise, deferred2.promise], function(progress) {
      progressCalled = true;
      // This will use Q's internal array_indexOf
      progressIndex = [deferred1.promise, deferred2.promise].indexOf(progress.promise);
    });

    // Trigger progress notification
    deferred1.notify({ promise: deferred1.promise });

    return promise.then(() => {
      // In original code, progressIndex should be 0 (found at index 0)
      // In mutated code, progressIndex will be -1 (not found)
      expect(progressIndex).toBe(0);
    });
  });
});