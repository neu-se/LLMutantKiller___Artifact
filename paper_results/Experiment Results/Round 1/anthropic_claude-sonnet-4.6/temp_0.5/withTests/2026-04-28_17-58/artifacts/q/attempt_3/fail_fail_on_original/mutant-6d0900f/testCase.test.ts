import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should still list a handled rejection in unhandledReasons when tracking is enabled", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // Handle the rejection - this triggers untrackRejection internally
    // We need to wait for the async handling to complete
    return rejected.fail(function () {
      return "recovered";
    }).then(function () {
      // With original code: untrackRejection is a no-op when trackUnhandledRejections=true
      // The rejection remains in unhandledReasons
      // With mutated code: untrackRejection always runs, removing the rejection
      // unhandledReasons becomes empty
      expect(Q.getUnhandledReasons()).toEqual([error.stack]);
    });
  });
});