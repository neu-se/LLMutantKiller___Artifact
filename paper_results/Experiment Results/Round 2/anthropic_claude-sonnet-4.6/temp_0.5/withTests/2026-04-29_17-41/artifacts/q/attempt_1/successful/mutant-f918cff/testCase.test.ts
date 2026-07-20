import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise promiseDispatch exception handling", () => {
  it("should resolve with a rejected promise when a descriptor method throws an exception", (done) => {
    const thrownError = new Error("descriptor method threw");

    // Create a promise using Q.makePromise with a descriptor that throws
    const promise = Q.makePromise({
      "get": function () {
        throw thrownError;
      }
    });

    // Use dispatch to trigger the "get" operation which will throw
    const resultPromise = promise.dispatch("get", ["someKey"]);

    resultPromise.then(
      function (value: unknown) {
        // In the mutated code, resolve is called with undefined (result is never set)
        // so this branch would be taken with value === undefined
        // In the original code, resolve is called with reject(exception),
        // so this branch should NOT be taken
        done(new Error("Expected rejection but got fulfillment with value: " + value));
      },
      function (reason: unknown) {
        // Original code: resolve(reject(exception)) causes rejection with the thrown error
        expect(reason).toBe(thrownError);
        done();
      }
    );
  });
});