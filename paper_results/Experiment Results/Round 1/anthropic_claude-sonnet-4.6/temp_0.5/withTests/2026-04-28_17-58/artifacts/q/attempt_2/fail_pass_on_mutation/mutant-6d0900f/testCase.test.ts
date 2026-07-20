import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should still report a rejection in unhandledReasons even after it has been handled via fail()", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // Handle the rejection - this triggers untrackRejection internally
    const handled = rejected.fail(function () {
      return "recovered";
    });

    // With original code: untrackRejection is a no-op when trackUnhandledRejections=true
    // so the rejection remains in unhandledReasons
    // With mutated code: untrackRejection always runs its body, removing the rejection
    // so unhandledReasons becomes empty
    expect(Q.getUnhandledReasons()).toEqual([error.stack]);

    return handled;
  });
});