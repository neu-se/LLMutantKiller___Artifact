import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.when function", () => {
  it("should resolve a promise with the given value", async () => {
    const deferred = Q.defer();
    const testValue = "test";
    deferred.resolve(testValue);

    const result = await Q.when(deferred.promise, (value: string) => {
      return value;
    });

    expect(result).toBe(testValue);
  });
});