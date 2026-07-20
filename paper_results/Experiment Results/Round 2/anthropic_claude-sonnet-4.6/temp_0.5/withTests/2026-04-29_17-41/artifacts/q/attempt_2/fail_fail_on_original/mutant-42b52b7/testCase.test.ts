import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("removes a handled rejection from unhandled reasons list", () => {
    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const reason = "specific rejection reason";
    deferred.reject(reason);

    // Rejection should now be tracked
    expect(Q.getUnhandledReasons()).toEqual(["(no stack) " + reason]);

    // Handle the rejection synchronously by chaining - this calls untrackRejection
    deferred.promise.fail(function () { return; });

    // After handling, the rejection should be removed from unhandled list
    expect(Q.getUnhandledReasons()).toEqual([]);
  });
});