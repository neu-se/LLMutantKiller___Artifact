import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should correctly handle done flag in promise rejection", async () => {
    const deferred = Q.defer();
    let fulfillmentCount = 0;
    let rejectionCount = 0;

    const promise = deferred.promise.then(
      () => {
        fulfillmentCount++;
        return "fulfilled";
      },
      () => {
        rejectionCount++;
        return "rejected";
      }
    );

    // First resolve, then reject to test done flag
    deferred.resolve(42);
    deferred.reject(new Error("test"));

    await promise;
    expect(fulfillmentCount).toBe(1);
    expect(rejectionCount).toBe(0);
  });
});