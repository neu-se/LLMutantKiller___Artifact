import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking with array_indexOf", () => {
  it("should correctly untrack a rejection when the promise is handled", async () => {
    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const reason = new Error("test rejection");
    deferred.reject(reason);

    // At this point, the rejection should be tracked
    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection - this calls untrackRejection which uses array_indexOf
    await deferred.promise.fail(function () {
      // handled
    });

    // After handling, the rejection should be untracked
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});