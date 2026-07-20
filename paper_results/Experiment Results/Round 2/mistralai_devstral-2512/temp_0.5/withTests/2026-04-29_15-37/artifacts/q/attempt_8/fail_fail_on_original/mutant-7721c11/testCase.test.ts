import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a promise in an array", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Test Q.all which internally uses array_indexOf for progress tracking
    // The mutation changes the condition from `this[i] === value` to `if (false)`
    // which would cause indexOf to always return -1, breaking progress tracking
    let progressIndex = -1;

    const promise = Q.all(promises).progress((progress: any) => {
      // This will use Q's internal array_indexOf to find which promise sent progress
      progressIndex = promises.indexOf(progress);
    });

    // Trigger progress notification from first promise
    deferred1.notify("progress");

    return Q.delay(10).then(() => {
      // In original code, progressIndex should be 0 (found at index 0)
      // In mutated code, progressIndex will be -1 (not found)
      expect(progressIndex).toBe(0);
    });
  });
});