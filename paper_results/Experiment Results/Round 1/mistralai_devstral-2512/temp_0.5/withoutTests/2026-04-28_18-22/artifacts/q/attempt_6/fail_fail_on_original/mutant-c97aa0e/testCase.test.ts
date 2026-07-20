const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should resolve with the first fulfilled promise when called on a promise instance", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const promise1 = deferred1.promise;
    const promise2 = deferred2.promise;
    const promise3 = deferred3.promise;

    // Create an array promise that will resolve to our test promises
    const arrayPromise = Q.resolve([promise1, promise2, promise3]);

    // Call any() on the promise instance
    const resultPromise = arrayPromise.any();

    // Verify the result promise is valid
    expect(resultPromise).toBeDefined();
    expect(typeof resultPromise.then).toBe('function');

    // Resolve the second promise
    setTimeout(() => {
      deferred2.resolve("resolved_value");
    }, 10);

    const result = await resultPromise;
    expect(result).toBe("resolved_value");
  });
});