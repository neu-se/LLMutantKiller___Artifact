import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.when mutation test", () => {
  it("should properly handle promise resolution with Q.when", async () => {
    const deferred = Q.defer();
    const result: number[] = [];

    // Test that Q.when properly handles promise resolution
    const promise = Q.when(deferred.promise, (value: number) => {
      result.push(value);
      return value * 2;
    });

    // Resolve the deferred promise
    deferred.resolve(5);

    // Wait for the promise to resolve and check the result
    const finalValue = await promise;
    expect(finalValue).toBe(10);
    expect(result).toEqual([5]);
  });
});