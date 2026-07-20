import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should prevent callback execution when done flag is set in rejection path", async () => {
    const deferred = Q.defer();
    let callbackCount = 0;

    const promise = deferred.promise.then(
      () => {
        callbackCount++;
        return "fulfilled";
      },
      () => {
        callbackCount++;
        return "rejected";
      }
    );

    // Trigger both resolution paths
    deferred.resolve(42);
    deferred.reject(new Error("test"));

    await promise;
    expect(callbackCount).toBe(1);
  });
});