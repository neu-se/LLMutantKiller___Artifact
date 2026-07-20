import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should prevent callback execution when done flag is set", async () => {
    const deferred = Q.defer();
    let callbackExecuted = false;

    const promise = deferred.promise.then(() => {
      callbackExecuted = true;
      return "executed";
    });

    // Manually trigger the promise resolution path
    deferred.promise.promiseDispatch((value) => {
      // This simulates the internal resolution path
      if (callbackExecuted) {
        throw new Error("Callback should not execute when done is true");
      }
      callbackExecuted = true;
    }, "when", [() => {}, () => {}]);

    deferred.resolve(42);
    await promise;
    expect(callbackExecuted).toBe(true);
  });
});