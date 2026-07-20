import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should fulfill with the first resolved promise when called on a promise instance", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Create a promise wrapping the array and call .any() on it
    const promiseOfArray = Q(promises);
    const result = promiseOfArray.any();

    // Resolve the second deferred first
    deferred2.resolve("second");
    deferred1.resolve("first");

    const value = await result;
    expect(value).toBe("second");
  });
});