import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should correctly handle the done flag in promise resolution", async () => {
    const deferred = Q.defer();
    let firstCall = false;
    let secondCall = false;

    const promise = deferred.promise.then(() => {
      if (!firstCall) {
        firstCall = true;
        // Force a second resolution attempt
        deferred.resolve(43);
      } else {
        secondCall = true;
      }
      return "result";
    });

    deferred.resolve(42);
    await promise;
    expect(firstCall).toBe(true);
    expect(secondCall).toBe(false);
  });
});