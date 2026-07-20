import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done static method", () => {
  it("should call the fulfilled callback when invoked via Q.done with a resolved promise", async () => {
    let fulfilledValue: unknown;
    const deferred = Q.defer();
    deferred.resolve(42);

    const resultPromise = new Promise<void>((resolve, reject) => {
      Q.done(deferred.promise, function (value: unknown) {
        fulfilledValue = value;
        resolve();
      });
      setTimeout(() => reject(new Error("Q.done callback was never called")), 500);
    });

    await resultPromise;
    expect(fulfilledValue).toBe(42);
  });
});