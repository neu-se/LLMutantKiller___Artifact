import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should prevent multiple executions of fulfillment callback when done flag is set", async () => {
    const deferred = Q.defer();
    let executionCount = 0;

    const promise = deferred.promise.then(() => {
      executionCount++;
      if (executionCount === 1) {
        // Simulate async operation that might cause re-entrancy
        setTimeout(() => {
          deferred.resolve(42);
        }, 0);
      }
      return executionCount;
    });

    deferred.resolve(42);
    await promise;
    expect(executionCount).toBe(1);
  });
});