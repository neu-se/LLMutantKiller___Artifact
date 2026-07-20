import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
  it("should not call the rejected callback after the fulfilled callback has already been called", () => {
    return new Promise<void>((testResolve, testReject) => {
      const deferred = Q.defer();
      let fulfilledCallCount = 0;
      let rejectedCallCount = 0;

      const resultPromise = deferred.promise.then(
        function onFulfilled(value: unknown) {
          fulfilledCallCount++;
          return value;
        },
        function onRejected(reason: unknown) {
          rejectedCallCount++;
          return reason;
        }
      );

      deferred.resolve(42);

      // After resolution, check that only the fulfilled callback was called
      // and the result promise resolves (not rejects)
      resultPromise.then(
        function (value: unknown) {
          try {
            expect(fulfilledCallCount).toBe(1);
            expect(rejectedCallCount).toBe(0);
            expect(value).toBe(42);
            testResolve();
          } catch (e) {
            testReject(e);
          }
        },
        function (reason: unknown) {
          testReject(
            new Error(
              `Expected promise to fulfill but it rejected with: ${reason}. ` +
              `fulfilledCallCount=${fulfilledCallCount}, rejectedCallCount=${rejectedCallCount}`
            )
          );
        }
      );
    });
  });
});