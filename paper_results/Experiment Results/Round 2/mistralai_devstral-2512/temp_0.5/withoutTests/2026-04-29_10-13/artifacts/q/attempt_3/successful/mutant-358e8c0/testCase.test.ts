const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with pending promises", () => {
  it("should correctly handle an array containing a pending promise", async () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;
    const promises = [pendingPromise];

    const resultPromise = Q.all(promises);

    // The result should be a promise that is still pending
    expect(resultPromise.isPending()).toBe(true);

    // Now resolve the deferred promise
    deferred.resolve("resolved");

    // Wait for the result to settle
    await expect(resultPromise).resolves.toEqual(["resolved"]);
  });
});