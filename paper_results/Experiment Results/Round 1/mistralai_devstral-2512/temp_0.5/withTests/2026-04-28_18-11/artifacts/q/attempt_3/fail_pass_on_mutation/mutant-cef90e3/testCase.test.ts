import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should handle multiple then calls on resolved promise correctly", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);

    let firstCallCount = 0;
    let secondCallCount = 0;

    const promise1 = deferred.promise.then(() => {
      firstCallCount++;
      return 100;
    });

    const promise2 = deferred.promise.then(() => {
      secondCallCount++;
      return 200;
    });

    await Promise.all([promise1, promise2]);
    expect(firstCallCount).toBe(1);
    expect(secondCallCount).toBe(1);
  });
});