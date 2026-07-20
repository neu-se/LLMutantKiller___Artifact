const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior with fulfilled promise", () => {
  it("should return the fulfillment value when promise is fulfilled", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const fulfillmentValue = "test value";
    deferred.fulfill(fulfillmentValue);

    // In the original code, valueOf returns the fulfillment value when state is "fulfilled"
    // In the mutated code, the condition is always true, so it would incorrectly treat
    // fulfilled promises as rejected and return the promise itself
    expect(promise.valueOf()).toBe(fulfillmentValue);
  });
});