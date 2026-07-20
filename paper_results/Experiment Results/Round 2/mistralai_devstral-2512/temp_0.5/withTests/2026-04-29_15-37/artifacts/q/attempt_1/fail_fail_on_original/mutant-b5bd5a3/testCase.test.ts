import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should use inspect() to determine valueOf behavior for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // For a pending promise, valueOf should return the promise itself
    expect(promise.valueOf()).toBe(promise);

    // Now resolve the promise
    deferred.resolve(42);

    // After resolution, we need to wait for the next tick to observe the change
    return Q.when(promise, (value) => {
      // After fulfillment, valueOf should return the resolved value
      expect(promise.valueOf()).toBe(42);
    });
  });
});