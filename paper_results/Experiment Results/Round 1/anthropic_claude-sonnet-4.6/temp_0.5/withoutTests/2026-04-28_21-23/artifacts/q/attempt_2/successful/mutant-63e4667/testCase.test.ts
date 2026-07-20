import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should dispatch keys operation with empty args array", async () => {
    let capturedArgs: any[] | undefined;

    // Create a deferred and intercept promiseDispatch
    const deferred = Q.defer();
    const originalDispatch = deferred.promise.promiseDispatch.bind(deferred.promise);
    deferred.promise.promiseDispatch = function(resolve: any, op: string, args: any[]) {
      if (op === "keys") {
        capturedArgs = args;
      }
      return originalDispatch(resolve, op, args);
    };

    deferred.resolve({ a: 1, b: 2 });

    const keysPromise = deferred.promise.keys();
    await keysPromise;

    expect(capturedArgs).toEqual([]);
  });
});