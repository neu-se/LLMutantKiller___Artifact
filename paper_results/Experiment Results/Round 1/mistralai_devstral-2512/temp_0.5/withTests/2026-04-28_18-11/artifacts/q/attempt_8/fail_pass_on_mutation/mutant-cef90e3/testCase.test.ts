import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should prevent multiple callback executions when done flag is set", async () => {
    const deferred = Q.defer();
    let executionCount = 0;

    const promise = deferred.promise.then(() => {
      executionCount++;
      // Try to trigger another execution by resolving again
      if (executionCount === 1) {
        deferred.resolve(43);
      }
      return executionCount;
    });

    deferred.resolve(42);
    await promise;
    expect(executionCount).toBe(1);
  });
});