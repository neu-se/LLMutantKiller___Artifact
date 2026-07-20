import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should not call the fulfillment callback more than once when promise is already resolved", async () => {
    let fulfillmentCallbackCallCount = 0;
    const deferred = Q.defer();
    deferred.resolve(42);

    const promise = deferred.promise.then(() => {
      fulfillmentCallbackCallCount++;
      return 100;
    });

    await promise;
    expect(fulfillmentCallbackCallCount).toBe(1);
  });
});